package	# hide from PAUSE
	CellBIS::DBIO::Query;

use strict;
use warnings;

use Data::Dumper;
use String::Util qw(trim);
use Scalar::Util 'blessed';
#use CellBIS::DBIO::Lite::Query::Utils;
use CellBIS::DBIO::Error;
use CellBIS::DBIO::Query::Action;

# ABSTRACT : Part of DBIO to handling query.
our $VERSION = '0.1000';

sub error_sql {return "CellBIS::DBIO::Error"}
sub action { "CellBIS::DBIO::Query::Action" }

# Controller :
# ------------------------------------------------------------------------
sub new {
	my $class = shift;
	my $self = {
		dbh => shift,
		connector => shift,
	};
	bless $self, $class;
	return $self;
}

# Custom Query :
# ------------------------------------------------------------------------
sub sQuery {
	my $self = shift;
	unshift(@_, $self->{dbh}) unless blessed($_[0]);
	my %data = ();

	my ($dbh, $query, $execute) = @_;
	my $sth = $dbh->prepare($query);
	$sth->execute(@{$execute});
	my $sql_error = error_sql;
	my @data = ($dbh, $sth, $sql_error);
	return @data;
}

# Custom Query no prepare statement :
# ------------------------------------------------------------------------
sub sQuery_do {
	my $self = shift;
	unshift(@_, $self->{dbh}) unless blessed($_[0]);
	my %data = (result => 0);

	my ($dbh, $query) = @_;
	if ($dbh->do($query)) {
		$data{result} = 1;
	}
	return \%data;
}

# insert data :
# ------------------------------------------------------------------------
sub insert {
	my $self = shift;
	unshift(@_, $self->{dbh}) unless blessed($_[0]);
	my $arg_len = scalar @_;
	my $data = {'result' => 2};

	unless ($arg_len < 4) {
		$arg_len = 6 if $arg_len >= 6;

		my $arg_name = 'insert_arg'.$arg_len;
		if (action->can($arg_name)) {
			$data = action->$arg_name(@_);
		}
	}
	return $data;
}

# update data :
# ------------------------------------------------------------------------
sub update {
	my $self = shift;
	unshift(@_, $self->{dbh}) unless blessed($_[0]);
	my $arg_len = scalar @_;
	my $data = {'result' => 2};

	if ($arg_len >= 5) {
		$arg_len = 6 if $arg_len > 6;

		my $arg_name = 'update_arg'.$arg_len;
		if (action->can($arg_name)) {
			$data = action->$arg_name(@_);
		}
	}
	return $data;
}

# delete data :
# ------------------------------------------------------------------------
sub delete {
	my $self = shift;
	unshift(@_, $self->{dbh}) unless blessed($_[0]);
	my $arg_len = scalar @_;
	my $data = {'result' => 2};

	if ($arg_len >= 4) {
		$arg_len = 4 if $arg_len < 4;
		$arg_len = 5 if $arg_len > 5;

		my $arg_name = 'delete_arg'.$arg_len;
		if (action->can($arg_name)) {
			$data = action->$arg_name(@_);
		}
	}
	return $data;
}

# select data :
# ------------------------------------------------------------------------
sub select {
	my $self = shift;
	unshift(@_, $self->{dbh}) unless blessed($_[0]);
	my $arg_len = scalar @_;
	my $data = {'result' => 2};

	if ($arg_len >= 3) {
		$arg_len = 6 if $arg_len > 6;

		my $arg_name = 'select_arg'.$arg_len;
		if (action->can($arg_name)) {
			$data = action->$arg_name(@_);
		}
	}
	return $data;
}

# select data :
# ------------------------------------------------------------------------
sub select_join {
	my $self = shift;
	unshift(@_, $self->{dbh}) unless blessed($_[0]);
	my $arg_len = scalar @_;
	my $data = {'result' => 2};

	if ($arg_len >= 5) {
		$arg_len = 6 if $arg_len > 6;

		my $arg_name = 'select_join_arg'.$arg_len;
		if (action->can($arg_name)) {
			$data = action->$arg_name(@_);
		}
	}
	return $data;
}

# get last data :
# ------------------------------------------------------------------------
sub last_data {
	my $self = shift;
	unshift(@_, $self->{dbh}) unless blessed($_[0]);
	my $arg_len = scalar @_;
	my %data = ('result' => 2);

	if ($arg_len >= 5) {
		my ($dbh, $table_name, $column, $orderby, $limit) = @_;
		my $size_col = scalar @{$column};
		my $data_col = '*';
		if ($size_col > 0) {
			$data_col = $column->[0] if ($size_col == 1);
			$data_col = join ', ', @{$column} if ($size_col > 1);
		}
		my $q = "SELECT $data_col FROM $table_name ORDER BY $orderby DESC LIMIT $limit";
		my $sth = $dbh->prepare($q);
		$sth->execute();
		my $rv = $sth->rows;
		if ($rv >= 1) {
			if ($rv > 1) {
				my @data = ();
				while (my $r_data = $sth->fetchrow_hashref()) {
					push @data, $r_data;
				}
				$data{'data'} = \@data;
			} else {
				my $r_data = $sth->fetchrow_hashref();
				$data{'data'} = $r_data;
			}
			$data{'result'} = 1;
		} else {
			$data{'result'} = 0;
			$data{'data'} = error_sql->errdata($sth);
		}
		$sth->finish();
#		$dbh->disconnect();
	}
	return \%data;
}

1;