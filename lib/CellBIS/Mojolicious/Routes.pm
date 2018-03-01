package CellBIS::Mojolicious::Routes;
use Mojo::Base '-strict';

use Scalar::Util qw(blessed);

use Mojo::Util qw(dumper);

# ABSTRACT: Module for working with Mojolicious Routes.
our $VERSION = '0.1000';

# Constructor :
# ------------------------------------------------------------------------
sub new {
  my $class = shift;
  my $self = {
    mojo => shift,
  };
  $self->{routes} = _routes_get_all($self->{mojo});
  return bless $self, ref $class || $class;
}

# get list routes :
# ------------------------------------------------------------------------
sub get_list {
  my $self = shift;
  my $mojo;
  if (blessed($self)) {
    $mojo = $self->{mojo};
    return $self->{routes};
  } else {
    $mojo = $_[0];
    my $get_routes = _routes_get_all($mojo);
    return $get_routes;
  }
}

# search routes :
# ------------------------------------------------------------------------
sub search {
  my $self = shift;
  my $arg_len = scalar @_;

  # Scalar :
  my $mojo;
  my $type;
  my $query;
  my $routes;
  my $status = 0;

  if (blessed($self)) {
    $mojo = $self->{mojo};
    if ($arg_len == 1) {
      $query = $_[0];
      $routes = $self->{routes};
      $status = 1;
    }
    if ($arg_len >= 2) {
      $type = $_[0];
      $query = $_[1];
      $status = 2;
    }
  } else {
    if ($arg_len == 2) {
      $mojo = $_[0];
      $query = $_[1];
      $routes = _routes_get_all($mojo);
      $status = 21;
    }
    if ($arg_len >= 3) {
      $mojo = $_[0];
      $type = $_[1];
      $query = $_[2];
      $routes = _routes_get_all($mojo);
      $status = 31;
    }
  }

  $self->{search} = _routes_search_all($mojo, $query, $routes) if ($status == 1);

  if ($status == 2) {
    $self->{search} = $self->_routes_search_pattern($query) if ($type eq 'pattern');
    $self->{search} = $self->_routes_search_name($query) if ($type eq 'name');
  }

  if ($status == 21) {
    $self->{mojo} = $mojo;
    $self->{search} = _routes_search_all($mojo, $query, $routes)
  }

  if ($status == 31) {
    $self->{search} = $self->_routes_search_pattern($query) if ($type eq 'pattern');
    $self->{search} = $self->_routes_search_name($query) if ($type eq 'name');
  }

  $self->{function} = 'search';
  return $self;
}

# Get Result :
# ------------------------------------------------------------------------
sub result {
  my $self = shift;
  if (blessed($self)) {
    if (exists $self->{function}) {
      if ($self->{function} ne '') {
        return $self->{search} if ($self->{function} eq 'search');
        return $self->{search} if ($self->{function} eq 'search');
      } else {
        return $self->{routes};
      }
    } else {
      return $self->{routes};
    }
  }
  return;
}


#########################################################################################
# ROUTES UTILITIES :
#########################################################################################

# Search roues by name :
# ------------------------------------------------------------------------
sub _routes_search_name {
  my $self = shift;
  my ($routes, $search);
  if (blessed($self)) {
    if (exists $self->{routes}) {
      $routes = $self->{routes};
      ($search) = @_;
    } else {
      ($routes, $search) = @_;
    }
  } else {
    ($self, $routes, $search) = @_;
  }

  my @search = grep { $_->{name} =~ m/$search/ } @$routes;
  return \@search;
}

# Search routes by pattern :
# ------------------------------------------------------------------------
sub _routes_search_pattern {
  my $self = shift;
  my ($mojo, $routes, $search);
  if (blessed($self)) {
    if (exists $self->{routes}) {
      $routes = $self->{routes};
      ($search) = @_;
    } else {
      ($routes, $search) = @_;
    }
  } else {
    ($mojo, $routes, $search) = @_;
  }

  my @search = grep { $_->{pattern} =~ m/$search/ } @$routes;
  return \@search;
}

# Search Routes general :
# ------------------------------------------------------------------------
sub _routes_search_all {
  my $arg_len = scalar @_;
  my ($mojo, $search, $routes);
  if ($arg_len == 2) {
    ($mojo, $search) = @_;
  }
  if ($arg_len >= 3) {
    ($mojo, $search, $routes) = @_;
  }
  my $result = [];

  unless ($routes) {
    $routes = _routes_get_all($mojo);
  }

  my @search1 = grep { $_->{name} =~ m/$search/ } @$routes;

  if (scalar @search1 > 0) {
    $result = \@search1;
  } else {
    my @search2 = grep { $_->{pattern} =~ m/$search/ } @$routes;
    $result = \@search2;
  }
  return $result;
}

# Get all routes mojolicious :
# ------------------------------------------------------------------------
sub _routes_get_all {
  my ($mojo) = @_;

  my $rows = [];
  _routes($_, 0, $rows) for @{$mojo->app->routes->children};
  return $rows;
}

# Get Routes Mojolicious :
# ------------------------------------------------------------------------
sub _routes {
  my ($route, $depth, $rows) = @_;

  # Pattern
  my $prefix = '';
  #  if (my $i = $depth * 2) { $prefix .= ' ' x $i . '+' }
  push @$rows, my $row_routes = { pattern => $prefix . ($route->pattern->unparsed || '/') };

  # For Controller name :
  $row_routes->{controller} = ($route->pattern->defaults || '');

  # Name
  my $name = $route->name;
  $row_routes->{name} = $route->has_custom_name ? $name : $name;

  $depth++;
  _routes($_, $depth, $rows) for @{$route->children};
  $depth--;
}

1;

=encoding utf8

=head1 NAME

CellBIS::Mojolicious::Routes - Module for working with mojolicious.

=head1 SYNOPSIS

  Use MyApp;
  Use CellBIS::Mojolicious::Routes;

  # Initialization Mojolicious Application;
  my $my_app = MyApp->new;

  # Initialization :
  my $init = CellBIS::Mojolicious::Routes->new($my_app->app);

  # Get list Routes :
  my $routes_list = $init->get_list();

  # Search Routes :
  my $search = '';
  $search = $init->search('<keyword search>'); # Simple search routes
  $search = $init->search('pattern', '<keyword search>'); # Search routes by "pattern"
  $search = $init->search('name', '<keyword search>'); # Search routes by "name"

  # To get result search :
  $result_search = $search->result();

=head1 AUTHOR

Achmad Yusri Afandi, E<lt>yusrideb@cpan.orgE<gt>

=head1 COPYRIGHT AND LICENSE

Copyright (C) 2017 by Achmad Yusri Afandi

=cut
