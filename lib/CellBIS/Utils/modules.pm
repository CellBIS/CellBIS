package CellBIS::Utils::modules;
$CellBIS::Utils::modules::VERSION = '0.1';
use strict;
use warnings FATAL => 'all';

# Import Module :
use Hash::Merge qw( merge );

# Create Module for check IF module is exists :
# ------------------------------------------------------------------------
sub check {

    # Define parameter module :
    # ----------------------------------------------------------------
    my ($self, $module_name) = @_;

    eval("use $module_name");

    # Check IF eval is true :
    # Jika module belum diload.
    # ----------------------------------------------------------------
    if ($@) {
        #print "\$@ = $@\n";
        return(0);
    }

    # Check IF eval is false :
    # Jika module Telah diload.
    # ----------------------------------------------------------------
    else {
        return(1);
    }
}
# End of Create Module for check IF module is exists.
# ===========================================================================================================

1;