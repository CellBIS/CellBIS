package Mojolicious::Plugin::CellBIS;
use Mojo::Base 'Mojolicious::Plugin';

use CellBIS::Mojolicious;

use File::Basename 'dirname';
use File::Spec;
use File::Spec::Functions qw'rel2abs catdir';
use File::ShareDir 'dist_dir';
use Cwd;

# ABSTRACT: CellBIS Toolkit for Mojolicious.
our $VERSION = '0.1000';

# Register Plugin :
# ------------------------------------------------------------------------
sub register {
  my ($plugin, $app) = @_;
  
  # use content from directories under CellBIS/resources or using File::ShareDir
  my $lib_base = catdir(dirname(rel2abs(__FILE__)), '..', 'share', 'resources');
  
  my $public = catdir($lib_base, 'public');
  push @{$app->static->paths}, -d $public ? $public : catdir(dist_dir('Mojolicious-Plugin-CellBIS'), 'public');
  
  my $templates = catdir($lib_base, 'templates');
  push @{$app->renderer->paths},
      -d $templates ? $templates : catdir(dist_dir('Mojolicious-Plugin-CellBIS'), 'templates');
  
  $app->helper(cb_mojo => sub {
      my $mojo = shift;
      
      return CellBIS::Mojolicious->new($mojo);
    });
  
  $app->helper(cb_datetime => sub {return CellBIS::DateTime->new;});
  $app->helper(cb_datetime_now => sub {
      my $mojo = shift;
      my $datetime = CellBIS::DateTime->new();
      
      return $datetime->{dt_now};
    });
  
}

1;

=encoding utf8

=head1 NAME

Mojolicious::Plugin::CellBIS - CellBIS Project support Mojolicious.

=head1 SYNOPSIS

  # Plugin Activated in Mojolicious
  $self->plugin('CellBIS');
  
  # Plugin Activated in Mojolicious::Lite
  plugin 'CellBIS';

=head1 DESCRIPTION

L<Mojolicious::Plugin::CellBIS> is a CellBIS Toolkit based on L<Mojolicious> plugin.

=head1 HELPER

=head2 ROUTES

This helper for get list and search routes in Mojolicious Application.

  # For Routes handler :
  my $cellbis = $c->cb_mojo();
  
  # Get List Routes :
  my $get_routes = $cellbis->routes();
  my $list = $get_routes->get_list();
  
  # Search Routes :
  my $routes_search = '';
  
  # Simple search routes
  $routes_search = $get_routes->search('<keyword search>');
  
  # Search routes by "pattern"
  $routes_search = $get_routes->search('pattern', '<keyword search>');
  
  # Search routes by "name"
  $routes_search = $get_routes->search('name', '<keyword search>');

=head1 AUTHORS

Achmad Yusri Afandi, E<lt>yusrideb@cpan.orgE<gt>

=head1 COPYRIGHT AND LICENSE

Copyright (C) 2017 by Achmad Yusri Afandi

This library is free software; you can redistribute it and/or modify it under the same terms as Perl itself.