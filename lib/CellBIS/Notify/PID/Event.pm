package CellBIS::Notify::PID::Event;
$CellBIS::Notify::PID::Event::VERSION = '0.1';
use Mojo::Base '-strict';

# ABSTRACT: Module for handle Event Proccess

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