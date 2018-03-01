package  	# hide from PAUSE
	CellBIS::Auth::Utils;

use Mojo::Base '-strict';

use Scalar::Util qw(looks_like_number);
use Mojo::JSON 'j';
use Mojo::Util qw(dumper encode decode b64_encode b64_decode);
use String::Random;
use CellBIS::enkripsi;
use CellBIS::Auth::Store::Auth_login 'login_tbl_info';
use Mojo::Cookie::Response;

# ABSTRACT: Module for Authentication Utilities.
our $VERSION = '0.1000';

#######################################################################################
# FOR LOGIN LOGOUT
#######################################################################################

# For Create Cookies Login :
# ------------------------------------------------------------------------
sub _create_cookies_login {
	my $self = shift;
	my $mojo = shift;
	my ($cookies, $time_expire, $coo_name) = @_;
#	say "_create_cookies_login";
#	say dumper \@_;

#	my $cookie = Mojo::Cookie::Response->new();
#	$cookie->name($coo_name);
#	$cookie->value($cookies);
#	$cookie->expires($time_expire);
#	$cookie->httponly(1);
#	$mojo->res->cookies($cookie);

	$mojo->cookie($coo_name => $cookies, {path => '/', expires => $time_expire});
#	say 'cookie : '. $mojo->cookie($coo_name);
}

# For Create Session Login :
# ------------------------------------------------------------------------
sub _create_session_login {
	my $self = shift;
	my $arg_len = scalar @_;
	my ($mojo, $cookies_ori, $id_user, $id_login, $other_data) = ('', '', '', '', '');

	if ($arg_len == 4) {
		($mojo, $cookies_ori, $id_user, $id_login) = @_;
	}
	if ($arg_len >= 5) {
		($mojo, $cookies_ori, $id_user, $id_login, $other_data) = @_;
	}

	my $data_session = [ $id_user, $id_login ];
	if ($other_data ne '' and (ref($other_data) eq "HASH" or ref($other_data) eq "ARRAY")) {
		push @$data_session, $other_data
	}

	my $getKey_enc = CellBIS::enkripsi->getKey_enc($cookies_ori);
	my $session_lgn = CellBIS::enkripsi->Encoder(j($data_session), $getKey_enc);
	my $name_ssn = CellBIS::enkripsi->Encoder('lgn', $getKey_enc);
	$mojo->session($name_ssn => $session_lgn);
}

# Delete Session :
# ------------------------------------------------------------------------
sub delete_session_login {
	my $self = shift;
	my ($mojo, $cookies_login) = @_;
	my %data = ('result' => 2);

	my $ori_coo = $self->action_cookiesLogin('get', 'coo', $cookies_login);
	my $getKey_enc = CellBIS::enkripsi->getKey_enc($ori_coo);
	my $name_ssn = CellBIS::enkripsi->Encoder('lgn', $getKey_enc);
	delete $mojo->session->{$name_ssn};
}

# For prepare data cookies :
# ------------------------------------------------------------------------
sub _data_cookies {
	my ($self, $secret, $get_last_id) = @_;
	my %data = ('result' => 2);
#	say "_data_cookies :";
#	say dumper \@_;

	my $get_valCoo = part_value_coo($get_last_id);
#	say "result \$get_valCoo : ";
#	say dumper $get_valCoo;
	if ($get_valCoo->{result} == 1) {
#		say "True : \$get_valCoo";
		my $random = String::Random->new;
		my $first_part = $random->randpattern('C!ccC!snCcn!!ssCsn!ss');
		my $get_keyEnc0 = CellBIS::enkripsi->getKey_enc($secret);
		$first_part = CellBIS::enkripsi->Encoder($first_part, $get_keyEnc0);
		my $mid_part = $get_valCoo->{zero};
		my $last_part = $get_valCoo->{value};
		$mid_part= CellBIS::enkripsi->Encoder($mid_part, $get_keyEnc0);

		my $_randomChar = String::Random->new;
		my $r_akac = $_randomChar->randpattern('CCsc!Csn!Ccn!!ssCss!ns');
		my $r_delimiter = $_randomChar->randpattern('CCcsc!');

		my $global_pattrn = $r_akac.$r_delimiter.$r_akac;
		my $first_loop = CellBIS::enkripsi->rand_odd2even($global_pattrn, 4, 5, 0);
		my $last_loop = CellBIS::enkripsi->rand_odd2even($global_pattrn, 7, 5, 0);
		my $forLoop_pattern = time.$first_loop.$r_akac.$last_loop.time;
		my $pre_pattern = CellBIS::enkripsi->getKey_enc($forLoop_pattern);
		my $pattern_enc = CellBIS::enkripsi->rand_odd2even($global_pattrn, $pre_pattern->{num1}, $pre_pattern->{num2}, 2);
		my $get_keyEnc = CellBIS::enkripsi->getKey_enc($pattern_enc);
		$last_part = CellBIS::enkripsi->Encoder($pattern_enc.$last_part, $get_keyEnc);
		my $pre_value_cookies = CellBIS::enkripsi->rand_odd2even(
			$first_part.$mid_part.$last_part,
			$pre_pattern->{num2},
			$pre_pattern->{num1}, 2
		);
#		say "original Value Cookies1 : $pre_value_cookies";
		my $value_cookies = encode('UTF-8', $pre_value_cookies);
#		say "original Value Cookies2 : $value_cookies";
#		$value_cookies = b64_encode($value_cookies);
#		say "original Value Cookies3 : $value_cookies";
#		$value_cookies = CellBIS::enkripsi->Encoder($value_cookies, $get_keyEnc);
#		say "original Value Cookies4 : $value_cookies";

		$data{'result'} = 1;
		$data{'r_coo'} = $value_cookies;
		$data{'value'} = $get_valCoo->{value};
		$data{'code'} = $get_valCoo->{'code'};
		$data{'data'} = $get_valCoo->{data};
	} else {
#		say "False : \$get_valCoo";
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
		my $amount_zero = 21 - $size_valCoo;
		$data{'result'} = 1;
		$data{'zero'} = repl_zero_string($amount_zero);
		$data{'value'} = $size_valCoo;
		$data{'code'} = 'db';
	} else {
		my $amount_zero = 50;
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
	my $random_pattern = 'CCccCcnCccCCccCcnCccCCccCcnCcc';
	my $str_rand = String::Random->new;

	if (looks_like_number($num_zero)) {
		$num_zero = int($num_zero);
		$random_pattern = substr $random_pattern, 0, $num_zero;
		return $str_rand->randpattern($random_pattern);
	} else {
		return $str_rand->randpattern($random_pattern);
	}
}

# Get Time login if remember :
# ------------------------------------------------------------------------
sub get_time_login {
	my ($self, $remember, $expire, $expire_long) = @_;
	my $based_time = 'h';
	my $amount_time = 3;
	if ($expire =~ m/(\d+)(\w+)/) {
		$amount_time = $1;
		$based_time = $2;
	}
	if ($remember == 1) {
		$based_time = 'M';
		if ($expire_long =~ m/(\d+)(\w+)/) {
			$based_time = $2;
			$amount_time = $1;
		}
	}
	my $get_basedTime = cookies_basedTime($based_time);
	my $count_time = ($amount_time * $get_basedTime);
	my $data = {
		'abbr_time' => '+'.$amount_time.$based_time,
		'count_time' => $count_time,
	};
	return $data;
}

# Action User Login :
# ------------------------------------------------------------------------
sub action_cookiesLogin {
	my $self = shift;
	my $for = shift;

	if ($for eq 'create') { return _cookiesLogin_create(@_) }
	if ($for eq 'validation') { return _cookiesLogin_extract(@_) }
	if ($for eq 'get') { return _cookiesLogin_get(@_) }
}
sub _cookiesLogin_create {
	my ($type, $cookies) = @_;

	return CellBIS::enkripsi->rand_odd2even($cookies, 4, 2, 0) if ($type eq 'coo');
	return CellBIS::enkripsi->rand_odd2even($cookies, 2, 5, 0) if ($type eq 'db');
}
sub _cookiesLogin_extract {
	my ($type, $cookies) = @_;

	return CellBIS::enkripsi->unrand_odd2even($cookies, 4, 2, 0) if ($type eq 'coo');
	return CellBIS::enkripsi->unrand_odd2even($cookies, 2, 5, 0) if ($type eq 'db');
}
sub _cookiesLogin_get {
	my ($type, $cookies) = @_;

	return CellBIS::enkripsi->unrand_odd2even($cookies, 4, 2, 0) if ($type eq 'coo');
	return CellBIS::enkripsi->unrand_odd2even($cookies, 2, 5, 0) if ($type eq 'db');
}

#######################################################################################
# FOR COOKIE
#######################################################################################

# For get base time cookie :
# ------------------------------------------------------------------------
sub identify_cookies_time {
	my ($self, $abbr_time) = @_;

	my $operator = '';
	my $num_time = '';
	my $identifier = '';
	if ($abbr_time =~ m/^([\+|\-])([0-9]+)([A-Za-z]+)/) {
		$operator = $1;
		$num_time = $2;
		$identifier = $3;
	}

#	warn $num_time . " " . $identifier;
	$operator = $operator unless $operator eq '';
	$operator = '+' if $operator eq '';
	$num_time = $num_time unless $num_time eq '';
	$num_time = 3 if $num_time eq '';
	$identifier = $identifier unless $identifier eq '';
	$identifier = 'h' if $identifier eq '';

	my $based_time = cookies_basedTime($identifier);
	return ($num_time * $based_time);
}

# for get base time cookies :
# ------------------------------------------------------------------------
sub cookies_basedTime {
	my ($time) = @_;

	my $for_second = 1;
	my $for_minute = $for_second * 60;
	my $for_hour = $for_minute * 60;
	my $for_day = $for_hour * 24;
	my $for_week = $for_day * 7;
	my $for_month = $for_week * 4;
	my $for_year = $for_month * 12;

	my %data = (
		'Y' => $for_year,
		'M' => $for_month,
		'W' => $for_week,
		'D' => $for_day,
		'h' => $for_hour,
		'm' => $for_minute,
		's' => $for_second,
	);

	return $data{'m'} unless exists $data{$time};
	return $data{$time} if exists $data{$time};
}

# Subroutine for get time :
# ------------------------------------------------------------------------
sub get_time {
	my $self = shift;
	my $arg_len = scalar @_;
	my $timezone = 'Asia/Makassar';
	my $time_abbr = '+3h';
	my $attr = '';
	#	print "in get_time : \n";
	#	print Dumper \@_;
	$timezone = $_[0] if (exists $_[0] and $_[0] ne '');
	$time_abbr = $_[1] if (exists $_[1] and $_[1] ne '' and ($time_abbr =~ m/^([\+\-])([A-Za-z0-9]+)$/ or $time_abbr =~ m/^([0-9]+)([A-Za-z]+)$/) );
	$attr = $_[2] if (exists $_[2] and ref($_[2]) eq "HASH" and (scalar keys %{$_[2]}) != 0);

	if ($arg_len == 1) {
		$time_abbr = $_[0] unless ref($_[0]) eq "HASH";
		$attr = $_[0] if ref($_[0]) eq "HASH";
	}
	if ($arg_len == 2) {
		$timezone = $_[0];
		$time_abbr = $_[1];
	}

	if ($arg_len == 3) {
		$timezone = $_[0];
		$time_abbr = $_[1];
		$attr = $_[1] if ref($_[1]) eq "HASH";
	}
	$time_abbr = ($time_abbr =~ m/^([0-9]+)([A-Za-z]+)$/) ? '+'.$time_abbr : $time_abbr;

	my $delimiter_date = '-';
	my $delimiter_time = ':';
	my $delimiter_dateTime = ' ';
	my $format_dateTime = 'YYYY-MM-DD';
	if (ref($attr) eq "HASH") {
		$delimiter_date = $attr->{'delimiter_date'} if exists $attr->{'delimiter_date'};
		$delimiter_time = $attr->{'delimiter_time'} if exists $attr->{'delimiter_time'};
		$delimiter_dateTime = $attr->{'delimiter_datetime'} if exists $attr->{'delimiter_datetime'};
		$format_dateTime = $attr->{format} if exists $attr->{format};
	}

	# For Time Expire :
	my $time = time();
	my $attr_date = {
		'date' => $delimiter_date,
		'time' => $delimiter_time,
		'datetime' => $delimiter_dateTime,
		'format' => $format_dateTime,
		'minplus' => $time_abbr,
	};
	return CellBIS::DateTime->get($time, $timezone, $attr_date);
}
1;