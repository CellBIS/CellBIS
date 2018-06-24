package Mojolicious::Plugin::CellbisAuth::TokenForm;
$Mojolicious::Plugin::CellbisAuth::TokenForm::VERSION = '0.1';
use Mojo::Base 'Mojolicious::Plugin';

use Scalar::Util qw(looks_like_number);
use Mojo::JSON 'j';
use CellBIS::DateTime;
use CellBIS::Auth::Utils;
use CellBIS::Auth::Store::TokenForm 'tokenForm_tblInfo';

# ABSTRACT: Mojolicious Plugin for Token Form Validation

sub register {
	my $plugin = shift;
	my $arg_len = scalar @_;
	my $app;
	my $config;
	my $config_size = 0;

	if ($arg_len == 1) {
		($app) = @_;
	}
	if ($arg_len >= 2) {
		($app, $config) = @_;
		if (ref($config) eq "HASH") {
			$config_size = scalar keys %{$config};
		}
	}

	# Define DBI-Object :
	my $dbio = $config_size != 0 ? $app->dbioLite($config) : $app->dbioLite();

	# Define TokenForm DB Store :
	my $store = CellBIS::Auth::Store::TokenForm->new($dbio);

	# Create Table if Not Exists :
#	$store->create_table($dbio);

	$app->helper(cb_tokenform_create => sub {
			my $mojo = shift;
			my $arg_len_helper = scalar @_;
			my $name_token;
			my $time_config;
			my $time_config_size = 0;
			my %data = ('result' => 2, 'msg' => 'Fatal Error - Create Token Form');

			if ($arg_len_helper == 1) {
				if (ref($_[0]) eq "HASH") {
					$name_token = 'undef';
					$time_config = $_[0];
				} else {
					$name_token = $_[0];
				}
			}
			if ($arg_len_helper >= 2) {
				($name_token, $time_config) = @_;
				if (ref($time_config) eq "HASH") {
					$time_config_size = scalar keys %{$time_config_size};
				}
			}

			# For Time Configuration :
			if ($time_config_size == 0) {
				$time_config = {
					timezone    => 'Asia/Makassar',
					time_expire => '20m', # For 1 hour later. 2d => for 2 days later.
				}
			}
			my $expires_time = $time_config->{time_expire};

			# Get DateTime :
			my $dateTime = CellBIS::Auth::Utils->get_time($plugin->_time_config($time_config));
			$dateTime = $dateTime->{custom};

			# Get Token Access :
			my $get_token_access = $mojo->cbtoken_get_cookies();
			my $token_access = $get_token_access->{data};

			# Check Table before action :
			my $check_table = $store->check_table($dbio);
			if ($check_table->{result} == 1) {
				# Get Last Number of ID Auto_Increment :
				my $get_last_id = $store->get_last_id($dbio);

				# Create TokenForm
				my $create_token = $plugin->_create_token($mojo, $dbio, $store, $name_token, $token_access, $expires_time, $dateTime, $get_last_id);
				if ($create_token->{result} == 1) {
					%data = %{$create_token};
				} else {
					$data{'result'} = 0;
					$data{'msg'} = 'Error - Create Token Form';
				}

			} else {
				my $create_table = $store->create_table($dbio);
				if ($create_table->{result} == 1) {

					# Create TokenForm
					my $create_token = $plugin->_create_token($mojo, $dbio, $store, $name_token, $token_access, $expires_time, $dateTime);
					if ($create_token->{result} == 1) {
						%data = %{$create_token};
					} else {
						$data{'result'} = 0;
						$data{'msg'} = 'Error - Create Token Form';
					}
				}
				$mojo->app->log->error('[1501] Can\'t create table.') if ($create_table->{result} == 0);
			}
			return \%data;
	});

	$app->helper(cb_tokenform_validation => sub {
	    my $mojo = shift;
			my ($token_form, $token_access) = @_;

			

	});
}

#################################################################################
# UTILITIES AND STORE :
#################################################################################

# Check Token Form :
# ------------------------------------------------------------------------
sub _check_token {
	my $self = shift;
	my $arg_len = scalar @_;
	my $mojo;
	my $dbio;
	my $store;


}

# Create Token Form :
# ------------------------------------------------------------------------
sub _create_token {
	my $self = shift;
	my $arg_len = scalar @_;
	my $mojo;
	my $dbio;
	my $store;
	my $name_token;
	my $token_access;
	my $expires;
	my $dateTime;
	my $last_id = 0;
	my %data = ('result' => 0);

	if ($arg_len == 7) {
		($mojo, $dbio, $store, $name_token, $token_access, $expires, $dateTime) = @_;
	}
	if ($arg_len >= 8) {
		($mojo, $dbio, $store, $name_token, $token_access, $expires, $dateTime, $last_id) = @_;
	}

	my $list_ip = {
		'x-forwarder-for' =>
			$mojo->req->headers->header('X-Forwarded-For') ? $mojo->req->headers->header('X-Forwarded-For') : '',
		'x-real-ip'       => $mojo->req->headers->header('X-Real-IP') ? $mojo->req->headers->header('X-Real-IP') : '',
		'remote-ip'       => $mojo->tx->remote_address ? $mojo->tx->remote_address : '',
		'ua'							=> $mojo->req->headers->user_agent,
	};

	my $new_token = _new_token($last_id);

	my $insert_data = $store->create({
			'name' => $name_token,
			'ip' => j($list_ip),
			'token' => $new_token,
			'token_access' => $token_access,
			'expire' => {
				'datetime' => $dateTime,
				'sql_event' => $expires
			}
		}, $store->{table_info});

	if ($insert_data->{result} == 1) {
		$data{'result'} = 1;
		$data{'data'} = {
			id_token => $insert_data->{data},
			token => $new_token
		};
		$data{'msg'} = 'Success - Create Token Form';
	} else { $data{'msg'} = 'Error - Create Token Form' }

	return \%data;
}
# Get new Token :
# ------------------------------------------------------------------------
sub _new_token {
	my ($last_id_num) = @_;

	my $get_valToken = _part_token_val($last_id_num);
	my $random = String::Random->new;
	my $first_part = $random->randpattern('CCccCcnCccn');
	my $mid_part = $get_valToken->{zero};
	my $last_part = $get_valToken->{value};

	my $_randomChar = String::Random->new;
	my $r_akac = $_randomChar->randpattern('nCcCCcnCnCn');

	my $global_pattrn = 'ABCDEF'.$r_akac.'NOPQRS'.$r_akac.'TUVWXYZ';
	my $first_loop = CellBIS::enkripsi->rand_odd2even($global_pattrn, 4, 5, 0);
	my $forLoop_pattern = time.$first_loop.$r_akac;
	my $pre_pattern = CellBIS::enkripsi->getKey_enc($forLoop_pattern);
	my $pattern_enc = CellBIS::enkripsi->rand_odd2even($global_pattrn, $pre_pattern->{num1}, $pre_pattern->{num2}, 2);
	my $get_keyEnc = CellBIS::enkripsi->getKey_enc($pattern_enc);
	$last_part = CellBIS::enkripsi->Encoder($pattern_enc.$last_part, $get_keyEnc);
	return CellBIS::enkripsi->rand_odd2even($first_part.$mid_part.$last_part, $pre_pattern->{num2}, $pre_pattern->{num1}, 2);
}

# For Part of Token value :
# ------------------------------------------------------------------------
sub _part_token_val {
	my ($last_id_num) = @_;
	my %data = ();

	if ($last_id_num >= 1) {
		my $size_valToken = length (int($last_id_num) + 1);
		my $amount_zero = 33 - $size_valToken;
		$data{'result'} = 1;
		$data{'zero'} = repl_zero_num($amount_zero);
		$data{'value'} = $size_valToken;
		$data{'code'} = 'db';
	} else {
		my $amount_zero = 10;
		$data{'result'} = 1;
		$data{'zero'} = repl_zero_num($amount_zero);
		$data{'value'} = 1;
		$data{'code'} = 'nodb';
	}
	return \%data;
}

# For replace zero num :
# ------------------------------------------------------------------------
sub repl_zero_num {
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

# Get Time Config :
# ------------------------------------------------------------------------
sub _time_config {
	my $self = shift;
	my ($time_config) = @_;
	my @data = ();

	push @data, $time_config->{timezone} if exists $time_config->{timezone};
	push @data, $time_config->{time_expire} if exists $time_config->{time_expire};
	push @data, $time_config->{dt_attr} if exists $time_config->{dt_attr};
	return @data;
}

1;

=encoding utf8

=head1 NAME

Mojolicious::Plugin::CellbisAuth::TokenForm - Mojolicious Plugin

=head1 SYNOPSIS

  # Mojolicious
  $self->plugin('CellbisAuth::TokenForm' => {
		'db_config' => {
			'db_name' => 'table_name', # Table Name,
			'db_host' => 'localhost', # mysql host, default "localhost"
			'db_user' => 'username', # username user database.
			'db_pass' => 'password', # password user database.
		},
		'db_type' => 'mysql', # Type database
		'error_dbi' => {} # hashref attr DBI
  });

  # Mojolicious::Lite
  plugin 'CellbisAuth::TokenForm' => {
		'db_config' => {
			'db_name' => 'table_name', # Table Name,
			'db_host' => 'localhost', # mysql host, default "localhost"
			'db_user' => 'username', # username user database.
			'db_pass' => 'password', # password user database.
		},
		'db_type' => 'mysql', # Type database
		'error_dbi' => {} # hashref attr DBI
  });

  # To using plugin in Controller.
  $c->cb_tokenform_create({
  	timezone => 'Asia/Makassar',
  	time_expire => '1h', # For 1 hour ahead. 2d => for 2 days ahead.
  	dt_attr => {
			'date' => '-', # output date like, "/" => 1990/01/25, "-" => 1990-01-25
			'time' => ':', # output time like, ":" => 10:30:50, "_" => 10_30_50
			'datetime' => ' ', # result of delimiter like 1990-01-25 10:30:50
			'format' => 'YYYY-MM-DD', # For date format
  	},
  });

=head1 DESCRIPTION

L<Mojolicious::Plugin::CellbisAuth::Token> is a L<Mojolicious> plugin for Token to Authentication.

=head1 METHODS

L<Mojolicious::Plugin::CellbisAuth::Token> inherits all methods from
L<Mojolicious::Plugin> and implements the following new ones.

Register plugin in L<Mojolicious> application.

=head1 SEE ALSO

L<Mojolicious>, L<Mojolicious::Guides>, L<http://mojolicious.org>.

=cut