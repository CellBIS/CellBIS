package CellBIS::Notify::PID::Event;
use Mojo::Base '-strict';

# ABSTRACT: Module for handle Event Proccess
our $VERSION = '0.1000';

# If PID is found :
# ------------------------------------------------------------------------
sub IS_FOUND {
	print "IS FOUND";
}

# If PID is not found :
# ------------------------------------------------------------------------
sub IS_NOT_FOUND {
	print "IS NOT FOUND";
}

1;