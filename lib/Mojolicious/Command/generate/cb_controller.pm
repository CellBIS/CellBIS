package Mojolicious::Command::generate::cb_controller;
use Mojo::Base 'Mojolicious::Command';

use Mojolicious;
use Mojo::Util qw(class_to_path);

# ABSTRACT: Mojolicious command generator for controllers
our $VERSION = '0.1000';

has description => 'This aplication generate controller classes';
has usage => sub{ shift->_show_usage };

sub run {
	my ($self, $class, $version_app, $actions) = (shift, shift, shift, [@_]);

	$self->usage unless $class;

	# error - controller name malformed
	die 'Your controller name has to be a well formed (CamelCase) like "MyController".'
		unless $class =~ /^[A-Z](?:\w|::)+$/;

	# controller
	my $controller = "${class}";
	my $path       = class_to_path $controller;

	$self->render_to_rel_file('controller', "lib/$path", $controller, $actions, $version_app);
}

sub _show_usage {
	say qq{
Usage: APPLICATION generate cb_controller [CONTROLLER] [ACTION_LIST]

  mojo generate cb_controller MyAPP::Controller::User version_apps
  mojo generate cb_controller MyAPP::Controller::User version_apps index create show update remove

Options:
  -h, --help   Show this summary of available options
  };

	exit;
}

1;


=encoding utf8

=head1 NAME

Mojolicious::Command::generate::cb_controller - Controller generator command

=head1 SYNOPSIS

  Usage: APPLICATION generate cb_controller [CONTROLLER] [ACTION_LIST]

    mojo generate cb_controller MyAPP::Controller::User version_apps
    mojo generate cb_controller MyAPP::Controller::User version_apps index create show update remove

  Options:
    -h, --help   Show this summary of available options

=head1 DESCRIPTION

L<Mojolicious::Command::generate::cb_controller> generates controller directory
structure, file and action methods for a L<Mojolicious::Controller> class.

This module is forking from L<Mojolicious::Command::generate::controller>

=head1 ATTRIBUTES

L<Mojolicious::Command::generate::cb_controller> inherits all attributes from
L<Mojolicious::Command> and implements the following new ones.

=head2 usage

  my $usage = $app->usage;

Usage information for this command, used for the help screen.

=head1 METHODS

L<Mojolicious::Command::generate::cb_controller> inherits all methods from
L<Mojolicious::Command> and implements the following new ones.

=head2 run

  $app->run(@ARGV);

Run this command.

=head1 SEE ALSO

L<Mojolicious::Command>, L<Mojolicious::Guides>, L<http://mojolicious.org>.

=head1 AUTHORS

Author : Achmad Yusri Afandi, E<lt>yusrideb@cpan.orgE<gt>

Original Author : Daniel Vinciguerra E<lt>daniel.vinciguerra@bivee.com.brE<gt>

=head1 COPYRIGHT AND LICENSE

Copyright (C) 2017 by Achmad Yusri Afandi

This library is free software; you can redistribute it and/or modify it under the same terms as Perl itself.

=cut

__DATA__

@@ controller
% my ($class, $actions, $version_app) = @_;
package <%= $class %>;
use Mojo::Base 'Mojolicious::Controller';

# ABSTRACT: 
our $VERSION = '<%= $version_app %>';

% for my $a ( sort @$actions ){
# action for <%= $a %>
# ------------------------------------------------------------------------
sub <%= $a %> {
  my $c = shift;

}

% }

1;
