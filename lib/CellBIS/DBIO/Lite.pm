package CellBIS::DBIO::Lite;

use strict;
use warnings;

use Data::Dumper;
use Scalar::Util 'blessed';
use DBI;
use DBIx::Connector;
use CellBIS::DBIO::Table;
use CellBIS::DBIO::Query;
use CellBIS::DBIO::QueryString;

# ABSTRACT: Module for Simple DBI Object is called "DBIO Lite".
our $VERSION = '0.1000';

# For database type :
# ------------------------------------------------------------------------
sub _db_type {
	my ($db_type) = @_;
	my %data = ();
	my $dsn;

	$data{'sqlite'} = 'SQLite';
	$data{'mysql'} = 'mysql';
	$data{'pg'} = 'Pg';

	if (exists $data{$db_type}) {
		$dsn = 'DBI:' . $data{$db_type} . ':database=' unless $db_type eq 'sqlite';
		$dsn = 'DBI:' . $data{$db_type} . ':dbname=' if $db_type eq 'sqlite';
	} else {
		$dsn = 'DBI:' . $data{'mysql'} . ':database=' unless $db_type eq 'sqlite';
		$dsn = 'DBI:' . $data{'sqlite'} . ':dbname=' if $db_type eq 'sqlite';
	}
	return $dsn;
}

sub _dbHandler {
	my ($connector) = @_;
#	warn Dumper $connector;

	my $db_config = $connector->{db_config};
	my $db_type = $connector->{db_type};
	my $dbi_attr = $connector->{dbi_attr};
	if (exists $connector->{dbi_attr}) {
		if (scalar keys %{$dbi_attr} == 0) {
			$dbi_attr = {
				RaiseError => 1,
				PrintError => 1,
			};
		}
	} else {
		$connector->{dbi_attr} = {
			RaiseError => 1,
			PrintError => 1,
			mysql_auto_reconnect => 1
		};
		$dbi_attr = {
			RaiseError => 1,
			PrintError => 1,,
			mysql_auto_reconnect => 1
		};
	}

	my $db_user = '';
	my $db_pass = '';
	my $db_name = '';
	my $db_host = '';

	my $file_db;
	my $db_driver;
	my $dsn;

	if ($db_type eq 'sqlite') {
		$file_db = $db_config;
		$db_driver = _db_type($db_type);
		$dsn = $db_driver;
		$db_user = '';
		$db_pass = '';
		$db_name = $file_db->{db_name};
		$dsn = $db_driver . $db_name;
	} else {
		$db_user = $db_config->{'db_user'};
		$db_pass = $db_config->{'db_pass'};
		$db_name = $db_config->{'db_name'};
		$db_host = $db_config->{'db_host'};

		$db_driver = _db_type($db_type);
		$dsn = $db_driver . $db_name . ';host=' . $db_host . ';port=' . $db_config->{'db_port'} if (exists $db_config->{'db_port'});
		$dsn = $db_driver . $db_name . ';host=' . $db_host unless (exists $db_config->{'db_port'});
	}
#	return DBI->connect($dsn, $db_user, $db_pass, $dbi_attr);
#	print Dumper $dbi_attr;
#	my $dbh = DBI->connect($dsn, $db_user, $db_pass, $dbi_attr);
	if (!DBI->connect($dsn, $db_user, $db_pass, $dbi_attr)) {
		#		print "DBI is not OK\n";
		my @dsn_arr = split(/\;/, $dsn);
		my $dsn_driver = $dsn_arr[0];
		my $dsn_host = $dsn_arr[1];

		my @dsn_driver_arr = split(/\=/, $dsn_driver);
		my $dsn_db = $dsn_driver_arr[0];
		my $dsn_dbname = $dsn_driver_arr[1];

		my @dsn_db_arr = split(/\:/, $dsn_db);
		my $_DBI = $dsn_db_arr[0];
		my $_driver = $dsn_db_arr[1];

		my $dsn1 = "$_DBI:$_driver:$dsn_host";
		my $dbi_attr1 = {
			RaiseError => $dbi_attr->{RaiseError},
			PrintError => $dbi_attr->{PrintError},
			AutoCommit => 1,
			mysql_auto_reconnect => 1
		};
		my $dbh = DBI->connect($dsn1, $db_user, $db_pass, $dbi_attr1);
		$dbh->do("CREATE DATABASE IF NOT EXISTS $dsn_dbname");
		#		if ($dbh->do("CREATE DATABASE IF NOT EXISTS $dsn_dbname")) {
		#			print "Ok db create\n";
		#		}
#		$dbh->disconnect();
		my $dbh1 = DBI->connect($dsn, $db_user, $db_pass, $dbi_attr1);
		return $dbh1;
	} else {
		#		print "DBI OK\n";
		my $dbh = DBI->connect($dsn, $db_user, $db_pass, $dbi_attr);
		return $dbh
	}
}

# For Database Connection :
# ------------------------------------------------------------------------
sub new {
	my $class = shift;
	my $arg_len = scalar @_;
	my $self = {};
	if ($arg_len == 1) {
		$self = {
			connector => $_[0],
		};
		$self->{dbh} = _dbHandler($self->{connector}) if exists $self->{connector};
	}
	if ($arg_len >= 2) {
		$self = {
			connector => $_[0],
			dbh => $_[1]
		};
	}
	$self->{db_type} = $self->{connector}->{db_type} if exists $self->{connector}->{db_type};
	bless $self, ref $class || $class;
	return $self;
}

# Table Query :
# ------------------------------------------------------------------------
sub table {
	my $self = shift;
	my $arg_len = scalar @_;
	if ($arg_len == 0) {
		if (blessed($self) and exists $self->{connector}) {
			my $connector = $self->{connector};
			return CellBIS::DBIO::Table->new($self->{dbh}, $connector);
		}
	}
	if ($arg_len >= 1) {
		if (ref($_[0]) eq "HASH") {
			my $connector = $self->{connector};
			return CellBIS::DBIO::Table->new($self->{dbh}, $connector);
		}
	}
}

# SQL Query :
# ------------------------------------------------------------------------
sub query {
	my $self = shift;
	my $arg_len = scalar @_;
	if ($arg_len == 0) {
		if (blessed($self) and exists $self->{connector}) {
			my $connector = $self->{connector};
			return CellBIS::DBIO::Query->new($self->{dbh}, $connector);
		}
	}
	if ($arg_len >= 1) {
		if (ref($_[0]) eq "HASH") {
			my $connector = $self->{connector};
			return CellBIS::DBIO::Query->new($self->{dbh}, $connector);
		}
	}
}

# SQL Query String :
# ------------------------------------------------------------------------
sub query_string {
	my $self = shift;
	return CellBIS::DBIO::QueryString->new();
}

# For Database connection utilities :
# ------------------------------------------------------------------------
#sub db {
#	my $self = shift;
#	my $connector = $self->{connector};
#	return CellBIS::DBIO::DB->new($self->{dbh}, $connector);
#}

sub test {
	my $self = shift;
	return blessed($self->{dbh}) if blessed($self->{dbh});
#	return "Wrong";
}

1;

