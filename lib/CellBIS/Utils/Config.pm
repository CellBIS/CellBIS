package CellBIS::Utils::Config;
use strict;
use warnings FATAL => 'all';

use CellBIS::enkripsi;

our $VERSION = '0.1000';

# Secret config login :
# ------------------------------------------------------------------------
sub secret_login_config {
	my $self = shift;
	my $secret = join '', ("A" .. "Z", "a" .. "z", 0..9);

	my $getKey = CellBIS::enkripsi->getKey_enc($secret);
	return CellBIS::enkripsi->Encoder($secret, $getKey);
}

1;