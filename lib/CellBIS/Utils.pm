package CellBIS::Utils;
$CellBIS::Utils::VERSION = '0.1';
use strict;
use warnings FATAL => 'all';

# Subroutine for get protocols :
# ------------------------------------------------------------------------
=head1 SUBROUTINE get_protocol()

    Deskripsi subroutine get_protocol() :
    ----------------------------------------
    Subroutine yang berfungsi untuk mengambil data protocol.

    Parameter subroutine get_protocol() :
    ----------------------------------------
    No parameter Subroutine.

=cut
sub get_protocol {

    # Prepare to get Protocol used :
    # ----------------------------------------------------------------
    #my $get_protocol = (defined $ENV{'HTTPS'} || $ENV{'SERVER_PORT'} == '443') ? "https:" : "http:";
    my $get_protocol = undef;
    if (defined  $ENV{'HTTPS'} || $ENV{'SERVER_PORT'} == '443') {
        $get_protocol = 'https:';
    } else {
        $get_protocol = 'http:';
    }

    # Return Result :
    # ----------------------------------------------------------------
    return $get_protocol;
}
# End of Subroutine for get protocols.
# ===========================================================================================================

# Subroutine for Try Module :
# ------------------------------------------------------------------------
=head1 SUBROUTINE try_module()

	Deskripsi subroutine try_module() :
	----------------------------------------
	Subroutine yang berfungsi untuk mengecek module.

	Parameter subroutine try_module() :
	----------------------------------------
	$module         =>  Berisi nama module. Ex: "Your::Module::Name".

	Output Parameter :
	----------------------------------------
	#

=cut
sub try_module {
	# Define parameter subroutine :
    my ($self, $modules) = @_;

    eval("use $modules");

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
# End of Subroutine for Try Module
# ===========================================================================================================
1;
__END__
#
