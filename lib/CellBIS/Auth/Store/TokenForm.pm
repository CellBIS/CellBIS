package CellBIS::Auth::Store::TokenForm;
use Mojo::Base '-strict';

use Scalar::Util qw(blessed);
use CellBIS::enkripsi;

# ABSTRACT: Module for Token Form database storage
our $VERSION = '0.1000';

our @EXPORT_OK = ('tokenForm_tblInfo');

sub tokenForm_tblInfo { __PACKAGE__->table_info() }

# Constructor :
# ------------------------------------------------------------------------
sub new {
	my $class = shift;
	my $arg_len = scalar @_;
	my $self;
	my $dbio = '';
	if ($arg_len >= 1 and blessed($_[0])) {
		$dbio = $_[0];
	}

	if (blessed($dbio)) {
		$self = {
			dbio => $dbio,
			table_info => $class->table_info(),
		};
	} else {
		$self = {
			table_info => $class->table_info(),
		};
	}
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
		if (exists $self->{dbio}) {
			$dbio = $self->{dbio};
			($data) = @_;
		} else {
			($dbio, $data) = @_;
		}
		$get_tableinfo = $self->{table_info};
	} else {
		if ($arg_len == 2) {
			($dbio, $data) = @_;
			$get_tableinfo = $self->table_info();
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
			$get_tableinfo->{'token'},
			$get_tableinfo->{'token_access'},
			$get_tableinfo->{'expire'},
		],
		[
			$data->{'name'},
			$data->{'ip'},
			$data->{'token'},
			$data->{'token_access'},
			$data->{'expire'}->{datetime},
		],
		{callback => 'data'},
		sub {
			my ($dbh, $sth, $id, $q, $param, $sql_error) = @_;
			my %data = ();
			my $rv = $sth->rows;
			if ($rv >= 1) {
				my $event_name = 'tkn_form_'.$id;
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
	my $arg_len = scalar @_;
	my $dbio;
	my $data;
	my $get_tableinfo;
	if (blessed($self)) {
		if (exists $self->{dbio}) {
			$dbio = $self->{dbio};
			($data) = @_;
		} else {
			($dbio, $data) = @_;
		}
		$get_tableinfo = $self->{table_info};
	} else {
		if ($arg_len == 2) {
			($dbio, $data) = @_;
			$get_tableinfo = $self->table_info();
		}
		if ($arg_len >= 3) {
			($dbio, $data, $get_tableinfo) = @_;
		}
	}

	my $db_query = $dbio->query();
	return $db_query->select(
		$get_tableinfo->{table_name},
		[
			$get_tableinfo->{'id_token'},
		],
		[ $data->{identify}, $data->{identify}, $data->{name}, $data->{token_access} ],
		{
			where => '('.$get_tableinfo->{'token'}."=? OR ".$get_tableinfo->{id_token}.") AND ".$get_tableinfo->{name}."=? AND".
				$get_tableinfo->{token_access}."=?",
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
				$data{'data'} = $r_data->{$get_tableinfo->{'id_token'}};
			} else {
				$data{'result'} = 0;
				$data{'data'} = $sql_error->errdata($sth);
			}
			return \%data;
		}
	);
}

# Delete token :
# ------------------------------------------------------------------------
sub delete {
	my $self = shift;
	my $arg_len = scalar @_;
	my $dbio;
	my $id_token;
	my $name;
	my $get_tableinfo;

	if (blessed($self)) {
		if (exists $self->{dbio}) {
			$dbio = $self->{dbio};
			($id_token, $name) = @_;
		} else {
			($dbio, $id_token, $name) = @_;
		}
		$get_tableinfo = $self->{table_info};
	} else {
		if ($arg_len == 3) {
			($dbio, $id_token, $name) = @_;
			$get_tableinfo = $self->table_info();
		}
		if ($arg_len >= 4) {
			($dbio, $id_token, $name, $get_tableinfo) = @_;
		}
	}

	my $db_query = $dbio->query();
	return $db_query->delete(
		$get_tableinfo->{table_name},
		[ $id_token, $name ],
		{
			where => $get_tableinfo->{id_token}.'=? AND '.$get_tableinfo->{name}.'=?',
			orderby => $get_tableinfo->{id_token},
			limit => 1
		},
		sub {
			my ($dbh, $sth, $sql_error) = @_;
			my %data = ();
			my $drop_event = 0;
			my $rv = $sth->rows;
			if ($rv >= 1) {
				my $event_name = 'tkn_form_'.$id_token;
				if ($dbh->do("DROP EVENT IF EXISTS $event_name")) {
					$drop_event = 1;
				}
				$data{'result'} = 1;
				$data{'event'} = $drop_event;
				$data{'data'} = $id_token;
			} else {
				$data{'result'} = 0;
				$data{'data'} = $sql_error->errdata($sth);
				$data{'event'} = $drop_event;
			}
			return \%data;
		}
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
		if (exists $self->{dbio}) {
			$dbio = $self->{dbio};
		} else {
			($dbio) = @_;
		}
		($dbio) = @_;
		$get_tableinfo = $self->{table_info};
	} else {
		if ($arg_len == 1) {
			($dbio) = @_;
			$get_tableinfo = $self->table_info();
		}
		if ($arg_len >= 2) {
			($dbio, $get_tableinfo) = @_;
		}
	}

	my $table_name = $get_tableinfo->{table_name};
	my $tbl_query = $dbio->table();
	return $tbl_query->last_id_autoIncrement($table_name);
}

# For Check Table :
# ------------------------------------------------------------------------
sub check_table {
	my $self = shift;
	my $arg_len = scalar @_;
	my $dbio;
	my $get_tableinfo;
	my $table;

	if (blessed($self)) {
		if (exists $self->{dbio}) {
			$dbio = $self->{dbio};
		} else {
			($dbio) = @_;
		}
		$get_tableinfo = $self->{table_info};

		$table = $dbio->table();
		return $table->check($get_tableinfo->{table_name});
	} else {
		if ($arg_len == 1) {
			($dbio) = @_;
			$get_tableinfo = $self->table_info();
			$table = $dbio->table();
			return $table->check($get_tableinfo->{table_name});
		}
		if ($arg_len >= 2) {
			($dbio, $get_tableinfo) = @_;

			$table = $dbio->table();
			return $table->check($get_tableinfo->{table_name});
		}
	}
}

# For Create Table :
# ------------------------------------------------------------------------
sub create_table {
	my $self = shift;
	my $arg_len = scalar @_;

	my $dbio;
	my $get_tableinfo;

	if (blessed($self)) {
		if (exists $self->{dbio}) {
			$dbio = $self->{dbio};
		} else {
			($dbio) = @_;
		}
		$get_tableinfo = $self->{table_info};
	} else {
		if ($arg_len == 1) {
			($dbio) = @_;
			$get_tableinfo = $self->table_info();
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
			$get_tableinfo->{'token'},
			$get_tableinfo->{'token_access'},
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
				type => { name => 'longtext' },
			},
			$get_tableinfo->{'token'} => {
				type => { name => 'longtext' }
			},
			$get_tableinfo->{'token_access'} => {
				type => { name => 'longtext' }
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

# For table Information :
# ------------------------------------------------------------------------
sub table_info {
	my $self = shift;
	my %data = ();

	my $key_enc = CellBIS::enkripsi->getKey_enc('PLzgYs2FjiGDrnMl6UnjQStxXf8NmgJEapQu5BlhNRqePa4Sao7');

	$data{'table_name'} = 'tkF_'.CellBIS::enkripsi->Encoder('Form', $key_enc);
	$data{'id_token'} = CellBIS::enkripsi->Encoder('id_token', $key_enc);
	$data{'name'} = CellBIS::enkripsi->Encoder('name', $key_enc);
	$data{'ip'} = CellBIS::enkripsi->Encoder('ip', $key_enc);
	$data{'token'} = CellBIS::enkripsi->Encoder('token', $key_enc);
	$data{'token_access'} = CellBIS::enkripsi->Encoder('token_access', $key_enc);
	$data{'expire'} = CellBIS::enkripsi->Encoder('expire', $key_enc);
	return \%data;
}

1;