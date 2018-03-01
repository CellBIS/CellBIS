package CellBIS::Notify::PID;
use Mojo::Base '-strict';

use CellBIS::Notify::PID::Event;
use Mojo::File;

# ABSTRACT: Module for handle Proccess
our $VERSION = '0.1000';

# Constructor :
# ------------------------------------------------------------------------
sub new {
	my $class = shift;
	my $self = {
		cpid => [],

	};
	bless {}, ref $class || $class;
}

# Parent "subroutine" for check watcher PID :
# ------------------------------------------------------------------------
sub watch {
	my $self = shift;
}

# Parent "subroutine" for poll result of check PID :
# ------------------------------------------------------------------------
sub poll {
	my $self = shift;

	print "";
}

# Check PID :
# ------------------------------------------------------------------------
sub check_pid {
	my ($self, $mojo) = @_;

	my $get_pid = '';

}

1;