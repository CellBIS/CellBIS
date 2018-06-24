package Mojolicious::Command::cb_setup;
$Mojolicious::Command::cb_setup::VERSION = '0.1';
use Mojo::Base 'Mojolicious::Commands';

use Mojo::Util 'dumper';

# Short description
has description => 'CellBIS Tool to handling setup of application';
has hint        => <<EOF;

See 'APPLICATION generate help GENERATOR' for more information on a specific
generator.
EOF
has message    => sub { shift->extract_usage . "\nGenerators:\n" };
has namespaces => sub { ['Mojolicious::Command::cb_setup'] };

sub help { shift->run(@_) }

#sub run {
#	my ($self, @argv) = @_;

#	say dumper $self->app->{commands}->{namespaces}->[0];
#	say dumper $self->app;
#	say dumper $self->app->{commands};
#	say dumper $self->app->{commands};
#}

1;