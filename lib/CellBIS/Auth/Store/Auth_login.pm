package CellBIS::Auth::Store::Auth_login;
use Mojo::Base '-strict';

use Exporter 'import';
use Scalar::Util qw(blessed);
use Mojo::Util qw(dumper);
use JSON::XS;
use CellBIS::enkripsi;
use CellBIS::Auth::Store::Auth_login_old 'loginOld_tbl_info';

# ABSTRACT: CRUD for Login Authentication.
our $VERSION = '0.1000';

our @EXPORT_OK = ('login_tbl_info');

sub login_tbl_info {
	my ($secret) = @_;
	__PACKAGE__->table_info($secret)
}

# Constructor :
# ------------------------------------------------------------------------
sub new {
	my $class = shift;
	my $secret = shift;
	my $dbio = shift;
	my $self = {
		secret => $secret,
		dbio => $dbio,
		table_info => __PACKAGE__->table_info($secret)
	};
	return bless $self, ref $class || $class;
}

# For Create Auth Login :
# ------------------------------------------------------------------------
sub create {
	my $self = shift;
	my $arg_len = scalar @_;
	my $secret;
	my $dbio;
	my $data;
	my $get_tableinfo;

	if (blessed($self)) {
		$secret = $self->{secret};
		$dbio = $self->{dbio};
		$data = $_[0];
		$get_tableinfo = $self->{table_info};
	} else {
		if ($arg_len == 3) {
			($secret, $dbio, $data) = @_;
			$get_tableinfo = $self->table_info($secret);
		}
		if ($arg_len >= 4) {
			($secret, $dbio, $data, $get_tableinfo) = @_;
		}
	}

	#	warn "Create Auth Login Store = \n";
	#	warn Dumper \@_;
	my $db_query = $dbio->query();
	my $table_query = $dbio->table();
	my $fld_id = $get_tableinfo->{'id_login'};
	return $db_query->insert(
		$get_tableinfo->{table_name},
		[
			$get_tableinfo->{'id_user'},
			$get_tableinfo->{'ip'},
			$get_tableinfo->{'cookies'},
			$get_tableinfo->{'expire'},
		],
		[
			$data->{'id_user'},
			$data->{'ip'},
			$data->{'cookies'},
			$data->{'expire'}->{datetime},
		],
		{callback => 'data'},
		sub {
			my ($dbh, $sth, $id, $q, $param, $sql_error) = @_;
			my %data = ();
			my $rv = $sth->rows;
			if ($rv >= 1) {
				my $event_name = 'tkn_lgn_'.$id;
				my $event_create = $table_query->create_event(
					$dbh, $event_name, {
						type => 'one',
						time => $data->{'expire'}->{sql_event}
					},
					"DELETE FROM $param->{table_name} WHERE $fld_id = $id LIMIT 1;",
				);
				$data{'result'} = 1;
				$data{'data'} = $id;
				$data{'event'} = $event_create;
				#				warn encode_json($event_create);
			} else {
				$data{'result'} = 0;
				$data{'data'} = $sql_error->errdata($sth);
			}
			return \%data;
		}
	);
}

# For Read Auth Login :
# ------------------------------------------------------------------------
sub read {
	my $self = shift;
	my $arg_len = scalar @_;
	my $secret;
	my $dbio;
	my $data;
	my $get_tableinfo;

	if (blessed($self)) {
		$secret = $self->{secret};
		$dbio = $self->{dbio};
		$data = $_[0];
		$get_tableinfo = $self->{table_info};
	} else {
		if ($arg_len == 3) {
			($secret, $dbio, $data) = @_;
			$get_tableinfo = $self->table_info($secret);
		}
		if ($arg_len >= 4) {
			($secret, $dbio, $data, $get_tableinfo) = @_;
		}
	}

	my $db_query = $dbio->query();
	return $db_query->select(
		$get_tableinfo->{table_name},
		[],
		[$data->{cookies}, $data->{id_user}, $data->{id_login}],
		{
			where => $get_tableinfo->{'cookies'}."=? OR ".$get_tableinfo->{id_user}."=? OR ".$get_tableinfo->{id_login}."=?",
			limit => '1',
		},
		sub {
			my $sth = $_[1];
			my $sql_error = $_[4];
			my %data = ();
			my $rv = $sth->rows;
			if ($rv >= 1) {
				my $r_data = $sth->fetchrow_hashref();
				$data{'result'} = 1;
				$data{'data'} = {
					id_login => $r_data->{$get_tableinfo->{'id_login'}},
					id_user => $r_data->{$get_tableinfo->{'id_user'}},
					ip => $r_data->{$get_tableinfo->{'ip'}},
					cookies => $r_data->{$get_tableinfo->{'cookies'}},
					expire => $r_data->{$get_tableinfo->{'expire'}},
				};
			} else {
				$data{'result'} = 0;
				$data{'data'} = $sql_error->errdata($sth);
			}
			return \%data;
		}
	);
}

# For Delete Auth Login :
# ------------------------------------------------------------------------
sub delete {
	my $self = shift;
	my $arg_len = scalar @_;
	my $secret;
	my $dbio;
	my $data;
	my $get_tableinfo;

	if (blessed($self)) {
		$secret = $self->{secret};
		$dbio = $self->{dbio};
		$data = $_[0];
		$get_tableinfo = $self->{table_info};
	} else {
		if ($arg_len == 3) {
			($secret, $dbio, $data) = @_;
			$get_tableinfo = $self->table_info($secret);
		}
		if ($arg_len >= 4) {
			($secret, $dbio, $data, $get_tableinfo) = @_;
		}
	}

	my $db_query = $dbio->query();
#	say "Query Delete ";
	return $db_query->delete(
		$get_tableinfo->{table_name},
		[$data->{cookies}, $data->{id_user}, $data->{id_login}],
		{
			where => $get_tableinfo->{'cookies'}."=? AND ".$get_tableinfo->{id_user}."=? AND ".$get_tableinfo->{id_login}."=?",
			limit => 1,
		},
		sub {
			my ($dbh, $sth, $sql_error) = @_;
			my %data = ();
			my $q = "DROP EVENT IF EXISTS tkn_lgn_$data->{id_login};";
			if ($dbh->do($q)) {
				$data{'result'} = 1;
				$data{'data'} = {
					id_user => $data->{id_user},
					id_login => $data->{id_login},
				};
			} else {
				$data{'result'} = 0;
				$data{'data'} = $sql_error->errconn();
			}
			return \%data;
		}
	);
}

# For Check Auth Login :
# ------------------------------------------------------------------------
sub check {
	my $self = shift;
	my $arg_len = scalar @_;
	my $secret;
	my $dbio;
	my $data;
	my $get_tableinfo;

	if (blessed($self)) {
		$secret = $self->{secret};
		$dbio = $self->{dbio};
		$data = $_[0];
		$get_tableinfo = $self->{table_info};
	} else {
		if ($arg_len == 3) {
			($secret, $dbio, $data) = @_;
			$get_tableinfo = $self->table_info($secret);
		}
		if ($arg_len >= 4) {
			($secret, $dbio, $data, $get_tableinfo) = @_;
		}
	}

	my $db_query = $dbio->query();
	return $db_query->select(
		$get_tableinfo->{table_name},
		[ $get_tableinfo->{cookies} ],
		[ $data->{cookies},
			$data->{id_user},
			$data->{id_login}
		],
		{
			where => $get_tableinfo->{'cookies'}."=? AND ".table_info($self, $secret)->{id_user}."=? AND ".table_info($self, $secret)->{id_login}."=?",
			limit => '1',
		},
		sub {
			my $sth = $_[1];
			my $sql_error = $_[4];
			my %data = ();
			my $rv = $sth->rows;
			if ($rv >= 1) {
				my $r_data = $sth->fetchrow_hashref();
				$data{'result'} = 1;
				$data{'data'} = $r_data->{table_info($self, $secret)->{'cookies'}};
			} else {
				$data{'result'} = 0;
				$data{'data'} = $sql_error->errdata($sth);
			}
			return \%data;
		}
	);
}

# For get last user login :
# ------------------------------------------------------------------------
sub get_last {
	my $self = shift;
	my $arg_len = scalar @_;
	my $secret;
	my $dbio;
	my $get_tableinfo;

	if (blessed($self)) {
		$secret = $self->{secret};
		$dbio = $self->{dbio};
		$get_tableinfo = $self->{table_info};
	} else {
		if ($arg_len == 2) {
			($secret, $dbio) = @_;
			$get_tableinfo = $self->table_info($secret);
		}
		if ($arg_len >= 3) {
			($secret, $dbio, $get_tableinfo) = @_;
		}
	}

#	say "CRUD - get_last :";
#	say dumper \@_;
	my $db_query = $dbio->query();
	return $db_query->last_data(
		$get_tableinfo->{table_name},
		[
			$get_tableinfo->{'id_login'},
			$get_tableinfo->{'id_user'},
			$get_tableinfo->{'ip'},
			$get_tableinfo->{'cookies'},
			$get_tableinfo->{'expire'},
		],
		$get_tableinfo->{'id_login'},
		'1'
	);
}

# Get last ID Auto Increment :
# ------------------------------------------------------------------------
sub get_last_id {
	my $self = shift;
	my $arg_len = scalar @_;
	my $secret;
	my $dbio;
	my $get_tableinfo;

	if (blessed($self)) {
		$dbio = $self->{dbio};
		$get_tableinfo = $self->{table_info};
	} else {
		if ($arg_len == 1) {
			($secret, $dbio) = @_;
			$get_tableinfo = $self->table_info($secret);
		}
		if ($arg_len >= 2) {
			($secret, $dbio, $get_tableinfo) = @_;
		}
	}

	my $table_name = $get_tableinfo->{table_name};
	my $tbl_query = $dbio->table();
	return $tbl_query->last_id_autoIncrement($table_name);
}

# Create Trigger :
# ------------------------------------------------------------------------
sub trigger {
	my $self = shift;
#	my ($self, $secret, $dbio) = @_;
	my $arg_len = scalar @_;
	my $secret;
	my $dbio;
	my $get_tableinfo;

	if (blessed($self)) {
		$secret = $self->{secret};
		$dbio = $self->{dbio};
		$get_tableinfo = $self->{table_info};
	} else {
		if ($arg_len == 2) {
			($secret, $dbio) = @_;
			$get_tableinfo = $self->table_info($secret);
		}
		if ($arg_len >= 3) {
			($secret, $dbio, $get_tableinfo) = @_;
		}
	}
	my $get_table_old = loginOld_tbl_info($secret);

	my $table = $dbio->table();
	return $table->create_trigger(
		$get_tableinfo->{table_name},
		$get_tableinfo->{trigger_name},
		{
			type => 'before',
			action => 'delete',
		},
		"INSERT INTO ".$get_table_old->{table_name}."(".
				$get_table_old->{id_login}.', '.
				$get_table_old->{id_user}.', '.
				$get_table_old->{ip}.', '.
				$get_table_old->{cookies}.', '.
				$get_table_old->{create_date}.
			") VALUES(".
				'OLD.'.$get_tableinfo->{id_login}.', '.
				'OLD.'.$get_tableinfo->{id_user}.', '.
				'OLD.'.$get_tableinfo->{ip}.', '.
				'OLD.'.$get_tableinfo->{cookies}.', '.
				'NOW()'.
			")"
	);
}

# Subroutine for check table :
# ------------------------------------------------------------------------
sub check_table {
	my $self = shift;
#	my ($self, $secret, $dbio) = @_;
	my $arg_len = scalar @_;
	my $secret;
	my $dbio;
	my $get_tableinfo;

	if (blessed($self)) {
		$secret = $self->{secret};
		$dbio = $self->{dbio};
		$get_tableinfo = $self->{table_info};

		my $table = $dbio->table();
		return $table->check($get_tableinfo->{table_name});
	} else {
		if ($arg_len == 2) {
			($secret, $dbio) = @_;
			$get_tableinfo = $self->table_info($secret);

			my $table = $dbio->table();
			return $table->check($get_tableinfo->{table_name});
		}
		if ($arg_len >= 3) {
			($secret, $dbio, $get_tableinfo) = @_;

			my $table = $dbio->table();
			return $table->check($get_tableinfo->{table_name});
		}
	}
}

# For Create Table :
# ------------------------------------------------------------------------
sub create_table {
	my $self = shift;
#	my ($self, $secret, $dbio) = @_;
	my $arg_len = scalar @_;
	my $secret;
	my $dbio;
	my $get_tableinfo;

	if (blessed($self)) {
		$secret = $self->{secret};
		$dbio = $self->{dbio};
		$get_tableinfo = $self->{table_info};
	} else {
		if ($arg_len == 2) {
			($secret, $dbio) = @_;
			$get_tableinfo = $self->table_info($secret);
		}
		if ($arg_len >= 3) {
			($secret, $dbio, $get_tableinfo) = @_;
		}
	}

	my $table = $dbio->table();
	return $table->create(
		$get_tableinfo->{table_name},
		[
			$get_tableinfo->{'id_login'},
			$get_tableinfo->{'id_user'},
			$get_tableinfo->{'ip'},
			$get_tableinfo->{'cookies'},
			$get_tableinfo->{'expire'},
		],
		{
			$get_tableinfo->{'id_login'} => {
				type => { name => 'int', size => 51 },
				is_primarykey => 1,
				is_autoincre => 1,
			},
			$get_tableinfo->{'id_user'} => {
				type => { name => 'int', size => 11 },
			},
			$get_tableinfo->{'ip'} => {
				type => { name => 'varchar', size => 100 },
			},
			$get_tableinfo->{'cookies'} => {
				type => { name => 'text' }
			},
			$get_tableinfo->{'expire'} => {
				type => { name => 'datetime' }
			},
		},
		{
			'index' => [$get_tableinfo->{'id_user'}],
			charset => 'utf8',
			engine => 'innodb'
		}
	);
}

# Subroutine for table information :
# ------------------------------------------------------------------------
sub table_info {
	my $self = shift;
	my ($secret) = @_;

	my $getKey_enc = CellBIS::enkripsi->getKey_enc($secret);
	my $table_enc = CellBIS::enkripsi->getKey_enc(
			'DIWWtWWMDqqJvqDxqWWAHy'.
			'ADIWWq6qAqICWqGFWIAoIq');

	my %data = ();
	$data{'trigger_name'} = CellBIS::enkripsi->Encoder('trigg_login', $table_enc);
	$data{'table_name'} = CellBIS::enkripsi->Encoder('user_login', $table_enc);
	$data{'id_login'} = CellBIS::enkripsi->Encoder('id_login', $getKey_enc);
	$data{'id_user'} = CellBIS::enkripsi->Encoder('id_user', $getKey_enc);
	$data{'ip'} = CellBIS::enkripsi->Encoder('ip', $getKey_enc);
	$data{'cookies'} = CellBIS::enkripsi->Encoder('cookies', $getKey_enc);
	$data{'expire'} = CellBIS::enkripsi->Encoder('expire', $getKey_enc);
	return \%data;
}

1;