package CellBIS::Auth::Store::Token;
use strict;
use warnings;

use Scalar::Util qw(blessed);
use JSON::XS;

# ABSTRACT: Token Store.
our $VERSION = '0.1000';

# Constructor :
# ------------------------------------------------------------------------
sub new {
	my $class = shift;
	my $dbio = shift;
	my $table_info = table_info();
	my $self = {
		dbio => $dbio,
		table_info => $table_info,
	};
	return bless $self, ref $class || $class;
}

# For Create Token :
# ------------------------------------------------------------------------
sub create {
	my $self = shift;
	my $arg_len = scalar @_;
	my $dbio;
	my $data;
	my $get_tableinfo;

	if (blessed($self)) {
		$dbio = $self->{dbio};
		$data = $_[0];
		$get_tableinfo = $self->{table_info};
	} else {
		if ($arg_len == 2) {
			($dbio, $data) = @_;
			$get_tableinfo = table_info();
		}
		if ($arg_len >= 3) {
			($dbio, $data, $get_tableinfo) = @_;
		}
	}
	my $db_query = $dbio->query();
	my $table_query = $dbio->table();
	my $fld_id = $get_tableinfo->{'id_token'};
	return $db_query->insert(
		$get_tableinfo->{table_name},
		[
			$get_tableinfo->{'name'},
			$get_tableinfo->{'ip'},
			$get_tableinfo->{'cookies'},
			$get_tableinfo->{'expire'},
		],
		[
			$data->{'name'},
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
				my $event_name = 'tkn_access_'.$id;
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
			} else {
				$data{'result'} = 0;
				$data{'data'} = $sql_error->errdata($sth);
			}
			return \%data;
		}
	);
}

# For Read Token :
# ------------------------------------------------------------------------
sub read {
	my $self = shift;
	my ($dbio, $data) = @_;
	my $get_tableinfo = table_info();
	my $db_query = $dbio->query();
	return $db_query->select(
		$get_tableinfo->{table_name},
		[],
		[ $data->{cookies}, $data->{cookies} ],
		{
			where => $get_tableinfo->{'cookies'}."=? OR ".$get_tableinfo->{id_token}."=?",
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
				$data{'data'} = $r_data;
			} else {
				$data{'result'} = 0;
				$data{'data'} = $sql_error->errdata($sth);
			}
			return \%data;
		}
	);
}

# Delete Token :
# ------------------------------------------------------------------------
sub delete {
	my $self = shift;
	my $arg_len = scalar @_;
	my ($identify);

	my $dbio;
	my $get_tableinfo;

	if (blessed($self)) {
		$dbio = $self->{dbio};
		if ($arg_len >= 1) {
			($identify) = @_;
		}
		$get_tableinfo = $self->{table_info};
	} else {
		if ($arg_len == 2) {
			($dbio, $identify) = @_;
			$get_tableinfo = table_info();
		}
		if ($arg_len >= 3) {
			($dbio, $identify, $get_tableinfo) = @_;
		}
	}

	my $db_query = $dbio->query();
	return $db_query->delete(
		$get_tableinfo->{table_name},
		[$identify], # Value or where clause
		{
			where => $get_tableinfo->{cookies}.'=?',
			orderby => $get_tableinfo->{id_token},
			limit => 1,
		},
		sub {
			my ($dbh, $sth, $sql_error) = @_;
			my %data = ();
			my $rv = $sth->rows;
			if ($rv >= 1) {
				$data{'result'} = 1;
				$data{'data'} = $identify;
			} else {
				$data{'result'} = 0;
				$data{'data'} = $sql_error->errdata($sth);
			}
			return \%data;
		}
	);
}

# For Check Token :
# ------------------------------------------------------------------------
sub check {
	my $self = shift;
	my $arg_len = scalar @_;

	my $dbio;
	my $data;
	my $get_tableinfo;

	if (blessed($self)) {
		$dbio = $self->{dbio};
		$data = $_[0];
		$get_tableinfo = $self->{table_info};
	} else {
		if ($arg_len == 2) {
			($dbio, $data) = @_;
			$get_tableinfo = table_info();
		}
		if ($arg_len >= 3) {
			($dbio, $data, $get_tableinfo) = @_;
		}
	}

	my $db_query = $dbio->query();
	return $db_query->select(
		$get_tableinfo->{table_name},
		[ $get_tableinfo->{cookies} ],
		[ $data, $data ],
		{
			where => $get_tableinfo->{'cookies'}."=? OR ".$get_tableinfo->{id_token}."=?",
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
				$data{'data'} = $r_data;
			} else {
				$data{'result'} = 0;
				$data{'data'} = $sql_error->errdata($sth);
			}
			return \%data;
		}
	);
}

# For get last token akses :
# ------------------------------------------------------------------------
sub get_last {
	my $self = shift;
	my $arg_len = scalar @_;

	my $dbio;
	my $get_tableinfo;
	if (blessed($self)) {
		$dbio = $self->{dbio};
		$get_tableinfo = $self->{table_info};
	} else {
		if ($arg_len == 1) {
			($dbio) = @_;
			$get_tableinfo = table_info();
		}
		if ($arg_len >= 2) {
			($dbio, $get_tableinfo) = @_;
		}
	}

	my $db_query = $dbio->query();
	return $db_query->last_data(
		$get_tableinfo->{table_name},
		[
			$get_tableinfo->{'id_token'},
			$get_tableinfo->{'name'},
			$get_tableinfo->{'ip'},
			$get_tableinfo->{'cookies'},
			$get_tableinfo->{'expire'},
		],
		$get_tableinfo->{'id_token'},
		'1'
	);
}

# Get last ID Auto Increment :
# ------------------------------------------------------------------------
sub get_last_id {
	my $self = shift;
	my $arg_len = scalar @_;
	my $dbio;
	my $get_tableinfo;

	if (blessed($self)) {
		$dbio = $self->{dbio};
		$get_tableinfo = $self->{table_info};
	} else {
		if ($arg_len == 1) {
			($dbio) = @_;
			$get_tableinfo = table_info();
		}
		if ($arg_len >= 2) {
			($dbio, $get_tableinfo) = @_;
		}
	}

	my $table_name = $get_tableinfo->{table_name};
	my $tbl_query = $dbio->table();
	return $tbl_query->last_id_autoIncrement($table_name);
}

# For Create Table :
# ------------------------------------------------------------------------
sub create_table {
	my $self = shift;
	my $arg_len = scalar @_;

	my $dbio;
	my $get_tableinfo;

	if (blessed($self)) {
		$dbio = $self->{dbio};
		$get_tableinfo = $self->{table_info};
	} else {
		if ($arg_len == 1) {
			($dbio) = @_;
			$get_tableinfo = table_info();
		}
		if ($arg_len >= 2) {
			($dbio, $get_tableinfo) = @_;
		}
	}

	my $table = $dbio->table();
	return $table->create(
		$get_tableinfo->{table_name},
		[
			$get_tableinfo->{'id_token'},
			$get_tableinfo->{'name'},
			$get_tableinfo->{'ip'},
			$get_tableinfo->{'cookies'},
			$get_tableinfo->{'expire'},
		],
		{
			$get_tableinfo->{'id_token'} => {
				type => { name => 'int', size => 33 },
				is_primarykey => 1,
				is_autoincre => 1,
			},
			$get_tableinfo->{'name'} => {
				type => { name => 'varchar', size => 200 }
			},
			$get_tableinfo->{'ip'} => {
				type => { name => 'longtext' }
			},
			$get_tableinfo->{'cookies'} => {
				type => { name => 'text' }
			},
			$get_tableinfo->{'expire'} => {
				type => { name => 'datetime' }
			},
		},
		{
			charset => 'utf8',
			engine => 'innodb'
		}
	);
}

# For Check Table :
# ------------------------------------------------------------------------
sub check_table {
	my $self = shift;
	my $arg_len = scalar @_;
	my $dbio;
	my $get_tableinfo;

	if (blessed($self)) {
		$dbio = $self->{dbio};
		$get_tableinfo = $self->{table_info};

		my $table = $dbio->table();
		return $table->check($get_tableinfo->{table_name});
	} else {
		if ($arg_len == 1) {
			($dbio) = @_;

			my $table = $dbio->table();
			return $table->check(table_info()->{table_name});
		}
		if ($arg_len >= 2) {
			($dbio, $get_tableinfo) = @_;

			my $table = $dbio->table();
			return $table->check($get_tableinfo->{table_name});
		}
	}
}

# For table Information :
# ------------------------------------------------------------------------
sub table_info {
	my %data = ();

	my $key_enc = CellBIS::enkripsi->getKey_enc('APvoEh2RjbYCejAt7UvbXFqiMn7LlmCJmoUb7NagCDqbIf7Yee5');
#
#	$data{'table_name'} = 'tk_'.CellBIS::enkripsi->Encoder('access', $key_enc);
#	$data{'id_token'} = CellBIS::enkripsi->Encoder('id_token', $key_enc);
#	$data{'name'} = CellBIS::enkripsi->Encoder('name', $key_enc);
#	$data{'ip'} = CellBIS::enkripsi->Encoder('ip', $key_enc);
#	$data{'cookies'} = CellBIS::enkripsi->Encoder('cookies', $key_enc);
#	$data{'expire'} = CellBIS::enkripsi->Encoder('expire', $key_enc);

	$data{'table_name'} = 'tk_'.CellBIS::enkripsi->Encoder('access', $key_enc);
	$data{'id_token'} = 'id_token';
	$data{'name'} = 'name';
	$data{'ip'} = 'ip';
	$data{'cookies'} = 'cookies';
	$data{'expire'} = 'expire';
	return \%data;
}
1;