package Mojolicious::Command::cb_setup::db;
$Mojolicious::Command::cb_setup::db::VERSION = '0.1';
use Mojo::Base 'Mojolicious::Command';

use Mojo::JSON qw(encode_json);
use Mojo::Util qw(dumper);
use Getopt::Long qw(GetOptionsFromArray);

has description => 'Generate Mojolicious application directory structure';
has usage => sub { shift->extract_usage };

sub run {
	my ($self, $class) = @_;
	$class ||= 'MyApp';

	# Prevent bad applications
	die <<EOF unless $class =~ /^[A-Z](?:\w|::)+$/;
Your application name has to be a well formed (CamelCase) Perl module name
like "MyApp".
EOF

	say "classname =  $class\n";
	say "contoh : ".dumper $self->app->secrets;

}
1;