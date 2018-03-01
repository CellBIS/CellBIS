package CellBIS::Auth::Store::Auth_login_old;
use Mojo::Base '-strict';

use Exporter 'import';

# ABSTRACT: CRUD for Logout activities.
our $VERSION = '0.1000';

our @EXPORT_OK = ('loginOld_tbl_info');

sub loginOld_tbl_info {
	my ($secret) = @_;
	__PACKAGE__->table_info($secret)
}

# Add new data logout record :
# ------------------------------------------------------------------------
sub create {
	my $self = shift;
	my ($secret, $dbio, $data) = @_;
	my $get_tableinfo = $self->table_info($secret);
	my $db_query = $dbio->query();
	return $db_query->insert(
		$get_tableinfo->{table_name},
		[
			$get_tableinfo->{id_login},
			$get_tableinfo->{id_user},
			$get_tableinfo->{ip},
			$get_tableinfo->{cookies},
			$get_tableinfo->{create_date},
		],
		[
			$data->{id_login},
			$data->{id_user},
			$data->{ip},
			$data->{cookies},
			'NOW()',
		],
		{ callback => 'data' },
		sub {
			my ($dbh, $sth, $id, $q, $param, $sql_error) = @_;
			my %data = ();
			my $rv = $sth->rows;
			if ($rv >= 1) {
				$data{'result'} = 1;
				$data{'data'} = '';
			} else {
				$data{'result'} = 0;
				$data{'data'} = $sql_error->errdata($sth);
			}
			return \%data;
		}
	);
}

# Check Table :
# ------------------------------------------------------------------------
sub check_table {
	my ($self, $secret, $dbio) = @_;
	my $table = $dbio->table();
	return $table->check($self->table_info($secret)->{table_name});
}

# Create Table :
# ------------------------------------------------------------------------
sub create_table {
	my $self = shift;
	my ($secret, $dbio) = @_;
	my $get_tableinfo = $self->table_info($secret);
	my $table = $dbio->table();
	return $table->create(
		$get_tableinfo->{table_name},
		[
			$get_tableinfo->{id_login_old},
			$get_tableinfo->{id_login},
			$get_tableinfo->{id_user},
			$get_tableinfo->{ip},
			$get_tableinfo->{cookies},
			$get_tableinfo->{create_date},
		],
		{
			$get_tableinfo->{id_login_old} => {
				type => { name => 'int', size => 11 },
				is_primarykey => 1,
				is_autoincre => 1,
			},
			$get_tableinfo->{id_login} => {
				type => { name => 'int', size => 11 },
			},
			$get_tableinfo->{id_user} => {
				type => { name => 'int', size => 11 },
			},
			$get_tableinfo->{ip} => {
				type => { name => 'varchar', size => 100 },
			},
			$get_tableinfo->{cookies} => {
				type => { name => 'longtext' },
			},
			$get_tableinfo->{create_date} => {
				type => { name => 'datetime' },
			},
		},
		{
			charset => 'utf8',
			engine => 'innodb'
		}
	);
}

# For table information :
# ------------------------------------------------------------------------
sub table_info {
	my ($self, $secret) = @_;

	my $getKey_enc = CellBIS::enkripsi->getKey_enc($secret);
	my $table_enc = CellBIS::enkripsi->getKey_enc(
			'EFqpCxWxEFqpCMWMpRxWCC'.
			'qpqJqqFJMxRIAAJRxAIpAx'.
			'RJWWRRxxJFqMoqqWBCIxBW'.
			'WABCIxBJWWRxxxJCAqoqqW'.
			'pJxMoBIICoMIBCIMxJxAMD');

	my %data = ();
	$data{'trigger_name'} = CellBIS::enkripsi->Encoder('trigg_loginOld', $table_enc);
	$data{'table_name'} = CellBIS::enkripsi->Encoder('user_login_old', $table_enc);
	$data{'id_login_old'} = CellBIS::enkripsi->Encoder('id_login_old', $getKey_enc);
	$data{'id_login'} = CellBIS::enkripsi->Encoder('id_login', $getKey_enc);
	$data{'id_user'} = CellBIS::enkripsi->Encoder('id_user', $getKey_enc);
	$data{'ip'} = CellBIS::enkripsi->Encoder('ip', $getKey_enc);
	$data{'cookies'} = CellBIS::enkripsi->Encoder('cookies', $getKey_enc);
	$data{'create_date'} = CellBIS::enkripsi->Encoder('create_date', $getKey_enc);
	return \%data;
}

1;