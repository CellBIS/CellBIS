package CellBIS::Auth::Token::Utils;
use strict;
use warnings;

use Data::Dumper;
use Scalar::Util qw(looks_like_number);
use String::Random;
use CellBIS::enkripsi;
use CellBIS::Auth::Store::Token;
use CellBIS::Auth::Utils;
#use Mojo::Cookie::Response;
use Mojo::ByteStream qw(b);

our $VERSION = '0.1000';

# For Create cookies Token :
# ------------------------------------------------------------------------
sub _cookies_token {
	my ($self, $mojo, $token, $expires) = @_;

	my $cooName = $mojo->cbcfg_token_name();
	my $domain = $mojo->cbcfg_domain();
	my $expire_time = CellBIS::Auth::Utils->identify_cookies_time($expires);

#	my $cookie = Mojo::Cookie::Response->new();
#	$cookie->name($cooName);
#	$cookie->value($token);
#	$cookie->expires(time + $expire_time);
	$mojo->cookie($cooName => $token, {path => '/', expires => (time + $expire_time)});
}

# For prepare data cookies :
# ------------------------------------------------------------------------
sub data_cookies {
	my ($self, $get_last_id) = @_;
	my %data = ('result' => 2);

	my $get_valCoo = part_value_coo($get_last_id);
	if ($get_valCoo->{result} == 1) {
		my $random = String::Random->new;
		my $first_part = $random->randpattern('CncCcCcn');
		my $mid_part = $get_valCoo->{zero};
		my $last_part = $get_valCoo->{value};

		my $_randomChar = String::Random->new;
		my $r_akac = $_randomChar->randpattern('nCccnCcn');

		my $global_pattrn = 'ABCDEF'.$r_akac.'TUVWXYZ';
		my $first_loop = CellBIS::enkripsi->rand_odd2even($global_pattrn, 2, 4, 0);
		my $pattern_enc = time.$first_loop.$r_akac.time;
		my $get_keyEnc = CellBIS::enkripsi->getKey_enc($pattern_enc);
		$last_part = CellBIS::enkripsi->Encoder($last_part, $get_keyEnc);
#		my $value_cookies = CellBIS::enkripsi->rand_odd2even($first_part.$mid_part.$last_part, $get_keyEnc->{num2}, $get_keyEnc->{num1}, 0);
		my $value_cookies = CellBIS::enkripsi->Encoder($first_part.$mid_part.$last_part, $get_keyEnc);
#		$value_cookies = b($value_cookies)->b64_encode();

		$data{'result'} = 1;
		$data{'r_token'} = $value_cookies;
		$data{'value'} = $get_valCoo->{value};
		$data{'code'} = $get_valCoo->{'code'};
		$data{'data'} = $get_valCoo->{data};
	} else {
		%data = %{$get_valCoo};
	}
	return \%data;
}

# For Part of Value Cookies :
# ------------------------------------------------------------------------
sub part_value_coo {
	my ($get_last_id) = @_;
	my %data = ();

	if ($get_last_id >= 1) {
		my $size_valCoo = length ($get_last_id + 1);
		my $amount_zero = 33 - $size_valCoo;
		$data{'result'} = 1;
		$data{'zero'} = repl_zero_string($amount_zero);
		$data{'value'} = $size_valCoo;
		$data{'code'} = 'db';
		$data{'data'} = {}
	} else {
		my $amount_zero = 10;
		$data{'result'} = 1;
		$data{'zero'} = repl_zero_string($amount_zero);
		$data{'value'} = 1;
		$data{'code'} = 'nodb';
		$data{'data'} = {};
	}
	return \%data;
}

# For replace zero num :
# ------------------------------------------------------------------------
sub repl_zero_string {
	my ($num_zero) = @_;
	my $random_pattern = 'CCccCcnCccnCCccCcnCccnCCccCcnCccn';
	my $str_rand = String::Random->new;

	if (looks_like_number($num_zero)) {
		$num_zero = int($num_zero);
		$random_pattern = substr $random_pattern, 0, $num_zero;
		return $str_rand->randpattern($random_pattern);
	} else {
		return $str_rand->randpattern($random_pattern);
	}
}

# For action of token :
# ------------------------------------------------------------------------
sub action_token {
	my $self = shift;
	my $for = shift;

	if ($for eq 'create') { return _token_create(@_) }
	if ($for eq 'validation') { return _token_extract(@_) }
	if ($for eq 'get') { return _token_get(@_) }
	if ($for eq 'trusted') { return _token_trusted(@_) }
}
sub _token_create {
	my $type = $_[0];
	my $token = $_[1];

	return CellBIS::enkripsi->rand_odd2even($token, 2, 3, 0) if ($type eq 'coo');
	return CellBIS::enkripsi->rand_odd2even($token, 1, 2, 0) if ($type eq 'db');
}
sub _token_get {
	my $type = $_[0];
	my $token = $_[1];

	return CellBIS::enkripsi->unrand_odd2even($token, 2, 3, 0) if ($type eq 'coo');
	return CellBIS::enkripsi->unrand_odd2even($token, 1, 2, 0) if ($type eq 'db');
}
sub _token_extract {
	my $type = $_[0];
	my $token = $_[1];

	return CellBIS::enkripsi->unrand_odd2even($token, 2, 3, 0) if ($type eq 'coo');
	return CellBIS::enkripsi->unrand_odd2even($token, 1, 2, 0) if ($type eq 'db');
}
sub _token_trusted {
	my $r_token = $_[1];
	my $ori_token = $_[2];

	unless ($r_token eq '') {
		return 1 if $r_token eq $ori_token;
	}
	return;
}

1;