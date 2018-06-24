package CellBIS::Mojolicious;
$CellBIS::Mojolicious::VERSION = '0.1';
use Mojo::Base -base;

use Scalar::Util qw(blessed);
use DateTime;

use CellBIS::Mojolicious::Routes;

# ABSTRACT: Module for working with mojolicious and Web Utilities.

# Constructor :
# ------------------------------------------------------------------------
sub new {
	my $class = shift;
	my $arg_len = scalar @_;
	my $self = {};
	if ($arg_len >= 1) {
		$self = {
			mojo => $_[0],
		}
	}
	return bless $self, ref $class || $class;
}

# For Routes List :
# ------------------------------------------------------------------------
sub routes {
	my $self = shift;
	if (blessed($self)) {
		return CellBIS::Mojolicious::Routes->new($self->{mojo});
	} else {
		return CellBIS::Mojolicious::Routes->new($_[0]);
	}
}

# For get list datetime :
# ------------------------------------------------------------------------
sub list_datetime {
	my $self = shift;
	my $arg_len = scalar @_;
	my ($start_dt, $last_dt, );
	if (blessed($self)) {
	} else {
	}
}

1;

=encoding utf8

=head1 NAME

CellBIS::Mojolicious - Module for working with mojolicious.

=head1 SYNOPSIS

	use MyApp;
	use CellBIS::Mojolicious;

	# Initialization Mojolicious Application
	my $my_app = MyApp->new;

	# Initialization :
	my $init = CellBIS::Mojolicious->new($my_app->app);

	# Get List Routes :
	my $routes = $init->routes();
	my $list = $routes->get_list();

	# Search Routes :
	my $routes_search = '';
	$routes_search = $init->search('<keyword search>'); # Simple search routes
	$routes_search = $init->search('pattern', '<keyword search>'); # Search routes by "pattern"
	$routes_search = $init->search('name', '<keyword search>'); # Search routes by "name"

=head1 DESCRIPTION

L<CellBIS::Mojolicious> is a Module for working with mojolicious.

=head1 SEE ALSO

L<Mojolicious>, L<Mojolicious::Guides>, L<http://mojolicious.org>.

=head1 AUTHOR

Achmad Yusri Afandi, E<lt>yusrideb@cpan.orgE<gt>

=head1 COPYRIGHT AND LICENSE

Copyright (C) 2017 by Achmad Yusri Afandi

=cut