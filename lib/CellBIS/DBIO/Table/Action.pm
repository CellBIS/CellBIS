package 	# hide from PAUSE
	CellBIS::DBIO::Table::Action;

use strict;
use warnings;

use Data::Dumper;
use Carp ();
use JSON::XS;
use String::Util qw(trim);
use CellBIS::DBIO::Table::Utils;
use CellBIS::DBIO::Error;

our $VERSION = '0.1000';

sub error_sql {"CellBIS::DBIO::Error"}
sub utils {"CellBIS::DBIO::Table::Utils"}

# For Action "create()" with 5 arg :
# ------------------------------------------------------------------------
sub create_arg5 {
	my $self = shift;

	my $dbh = $_[0];
	my $table_name = $_[1];
	my $col_list = $_[2];
	my $col_attr = $_[3];
	my $connector = $_[4];
	my %data = ('result' => 2);

	if (ref($col_list) eq "ARRAY") {
		my $q = utils->create_queryTbl($table_name, $col_list, $col_attr, $connector);
#		say "Query = $q";
		if ($dbh->do($q)) {
			$data{'result'} = 1;
			$data{'data'} = $table_name;
		} else {
			$data{'result'} = 0;
			$data{'data'} = error_sql->errconn();
		}
	}
	return \%data;
}

# For Action "create()" with 6 arg :
# ------------------------------------------------------------------------
sub create_arg6 {
	my $self = shift;

	my $dbh = $_[0];
	my $table_name = $_[1];
	my $col_list = $_[2];
	my $col_attr = $_[3];
	my $table_attr = $_[4];
	my $connector = $_[5];
	my %data = ('result' => 2);

	if (ref($col_list) eq "ARRAY") {
		my $q = utils->create_queryTbl($table_name, $col_list, $col_attr, $table_attr, $connector);
		if ($dbh->do($q)) {
			$data{'result'} = 1;
			$data{'data'} = $table_name;
		} else {
			$data{'result'} = 0;
			$data{'data'} = error_sql->errconn();
		}
	}
	return \%data;
}

# For Action "create()" with 7 arg :
# ------------------------------------------------------------------------
sub create_arg7 {
	my $self = shift;

	my $dbh = $_[0];
	my $table_name = $_[1];
	my $col_list = $_[2];
	my $col_attr = $_[3];
	my $table_attr = $_[4];
	my $connector = $_[6];
	my $callback = {};
	my %data = ('result' => 2);

	$callback = $_[5] if (ref($_[5]) eq "CODE");

	if (ref($col_list) eq "ARRAY") {
		my $q = utils->create_queryTbl($table_name, $col_list, $col_attr, $table_attr, $connector);
		if (ref($callback) eq "CODE") {
			return $dbh->$callback($q);
		} else {
			if ($dbh->do($q)) {
				$data{'result'} = 1;
				$data{'data'} = $table_name;
			} else {
				$data{'result'} = 0;
				$data{'data'} = error_sql->errconn();
			}
			return \%data;
		}
	} else {
		return \%data;
	}
}

#######################################################################################
# FOR EVENT SCHEDULER
#######################################################################################

# For Action "create_event()" for one times action :
# ------------------------------------------------------------------------
sub create_event_one {
	my $self = shift;
	my $event_name = $_[1];
	my $event_attr = $_[2];
	my $sql_event = $_[3];
	my $data = '';
#	warn "Time Event input in create_event_one : " . $event_attr->{time};

	my $time_action = $event_attr->{time};
	$time_action = '10m' unless ($event_attr->{time} =~ m/^[\+\-]([0-9]+)([A-Za-z]+)/ or $event_attr->{time} =~ m/^([0-9]+)([A-Za-z]+)/);
	$time_action = $event_attr->{time} if ($event_attr->{time} =~ m/^([0-9]+)([A-Za-z]+)/);
	$time_action = $event_attr->{time} if ($event_attr->{time} =~ m/^[\+\-]([0-9]+)([A-Za-z]+)/);

#	warn "Time Event After Proccess : " . $time_action;

	my $get_timeEvent = utils->check_event_time('', $time_action);

	$data .= "CREATE EVENT $event_name \n";
	$data .= "\tON SCHEDULE AT $get_timeEvent \n";

	$data .= "COMMENT '$event_attr->{comment}'\n"
		if exists $event_attr->{comment} and
			ref($event_attr->{comment}) eq "" and
			$event_attr->{comment} ne '';

	$data .= "DO BEGIN\n";
	$data .= "\t$sql_event\n";
	$data .= "END;";
}

# For Action "create_event()" for one times action and no delete events :
# ------------------------------------------------------------------------
sub create_event_one_nodel {
	my $self = shift;
	my $event_name = $_[1];
	my $event_attr = $_[2];
	my $sql_event = $_[3];
	my $data = '';

	my $time_action;
	$time_action = '10m' unless ($event_attr->{time} =~ m/^[\+\-]([0-9]+)([A-Za-z]+)/ or $event_attr->{time} =~ m/^([0-9]+)([A-Za-z]+)/);
	$time_action = $event_attr->{time} if ($event_attr->{time} =~ m/^([0-9]+)([A-Za-z]+)/);
	$time_action = $event_attr->{time} if ($event_attr->{time} =~ m/^[\+\-]([0-9]+)([A-Za-z]+)/);

	my $get_timeEvent = utils->check_event_time('', $time_action);

	$data .= "CREATE EVENT $event_name \n";
	$data .= "\tON SCHEDULE AT $get_timeEvent \n";
	$data .= "\tON COMPLETION PRESERVE \n";

	$data .= "COMMENT '$event_attr->{comment}'\n"
		if exists $event_attr->{comment} and
			ref($event_attr->{comment}) eq "" and
			$event_attr->{comment} ne '';

	$data .= "DO BEGIN\n";
	$data .= "\t$sql_event\n";
	$data .= "END;";
}

# For Action "create_event()" for recurring times action :
# ------------------------------------------------------------------------
sub create_event_recurr {
	my $self = shift;
	my $event_name = $_[1];
	my $event_attr = $_[2];
	my $sql_event = $_[3];
	my $data = '';

	my $time_action;
	$time_action = '10m' unless ($event_attr->{time} =~ m/^[\+\-]([0-9]+)([A-Za-z]+)/ or $event_attr->{time} =~ m/^([0-9]+)([A-Za-z]+)/);
	$time_action = $event_attr->{time} if ($event_attr->{time} =~ m/^([0-9]+)([A-Za-z]+)/);
	$time_action = $event_attr->{time} if ($event_attr->{time} =~ m/^[\+\-]([0-9]+)([A-Za-z]+)/);

	my $time_event = utils->check_event_time('every', $time_action);

	$data .= "CREATE EVENT $event_name \n";
	$data .= "\tON SCHEDULE $time_event \n";

	# For time start action Event :
	if (exists $event_attr->{start}) {
		my $timeAction_start;
		$timeAction_start = '10m' unless ($event_attr->{time} =~ m/^[\+\-]([0-9]+)([A-Za-z]+)/ or $event_attr->{time} =~ m/^([0-9]+)([A-Za-z]+)/);
		$timeAction_start = $event_attr->{time} if ($event_attr->{time} =~ m/^([0-9]+)([A-Za-z]+)/);
		$timeAction_start = $event_attr->{time} if ($event_attr->{time} =~ m/^[\+\-]([0-9]+)([A-Za-z]+)/);

		my $event_start = utils->check_event_time('', $time_action);

		$data .= "\tSTARTS $event_start \n";
	}

	# For time end action Event :
	if (exists $event_attr->{end}) {
		my $timeAction_end;
		$timeAction_end = '10m' unless ($event_attr->{time} =~ m/^[\+\-]([0-9]+)([A-Za-z]+)/ or $event_attr->{time} =~ m/^([0-9]+)([A-Za-z]+)/);
		$timeAction_end = $event_attr->{time} if ($event_attr->{time} =~ m/^([0-9]+)([A-Za-z]+)/);
		$timeAction_end = $event_attr->{time} if ($event_attr->{time} =~ m/^[\+\-]([0-9]+)([A-Za-z]+)/);

		my $event_end = utils->check_event_time('', $time_action);

		$data .= "\tENDS $event_end \n";
	}

	$data .= "COMMENT '$event_attr->{comment}'\n"
		if exists $event_attr->{comment} and
			ref($event_attr->{comment}) eq "" and
			$event_attr->{comment} ne '';

	$data .= "DO BEGIN\n";;
	$data .= "\t$sql_event\n";
	$data .= "END;";

	return $data;
}

#######################################################################################
# FOR TRIGGER
#######################################################################################

# For Action "create_trigger()" with arg 5 :
# ------------------------------------------------------------------------
sub create_trigger_arg5 {
	my $self = shift;
	my $dbh = $_[0];
	my $table_name = $_[1];
	my $trigger_name = $_[2];
	my $trigger_attr = $_[3];
	my $sql_query = $_[4];
	$sql_query = "$sql_query;" unless ($sql_query =~ m/\;$/);
	my $data = {'result' => 2};
	my $q = '';

	#	print "Hasil Arg :\n";
	#	print Dumper \@_;

	my $attr_val = utils->trigger_attr_val($trigger_attr);
	#	print "Hasil Validasi Attr\n";
	#	print "in subr 'create_trigger_5'\n";
	#	print Dumper $attr_val;
	#	print "--" x 10, "\n";
	if ($attr_val->{result} == 1) {
		my $type_trigger = uc $trigger_attr->{type};
		my $action_trigger = uc $trigger_attr->{action};
		$q .= "CREATE TRIGGER $trigger_name \n";
		$q .= "\t$type_trigger $action_trigger\n";
		$q .= "\tON $table_name FOR EACH ROW\n";
		$q .= "BEGIN \n";
		$q .= "\t$sql_query \n";
		$q .= "END";
		print "Result : \n$q\n";
		$dbh->do("DROP TRIGGER IF EXISTS $trigger_name");
		if ($dbh->do($q)) {
			$data->{'result'} = 1;
			$data->{'data'} = {
				'table_name' => $table_name,
				'trigger_name' => $trigger_name,
			};
		} else {
			$data->{'result'} = 0;
			$data->{'data'} = error_sql->errconn();
		}
	}
	return $data;
}

# For Action "create_trigger()" with arg 5 :
# ------------------------------------------------------------------------
sub create_trigger_arg6 {
	my $self = shift;
	my $dbh = $_[0];
	my $table_name = $_[1];
	my $trigger_name = $_[2];
	my $trigger_attr = $_[3];
	my $sql_query = $_[4];
	$sql_query = "$sql_query;" unless ($sql_query =~ m/\;$/);
	my $callback = $_[5];
	my $data = {'result' => 2};
	my $q = '';

	my $attr_val = utils->trigger_attr_val($trigger_attr);
	#	print "Hasil Validasi Attr\n";
	#	print "in subr 'create_trigger_6'\n";
	#	print Dumper $attr_val;
	if ($attr_val->{result} == 1) {
		my $type_trigger = uc $trigger_attr->{type};
		my $action_trigger = uc $trigger_attr->{action};
		$q .= "CREATE TRIGGER $trigger_name \n";
		$q .= "\t$type_trigger $action_trigger\n";
		$q .= "\tON $table_name FOR EACH ROW\n";
		$q .= "BEGIN \n";
		$q .= "\t$sql_query \n";
		$q .= "END";
		print "Result : \n$q\n";
		if (ref($callback) eq "CODE") {
			#			print "Result IN callback: \n$q\n";
			my $sql_error = error_sql->errconn();
			return $dbh->$callback($q, \@_, $sql_error);
		} else {
			$dbh->do("DROP TRIGGER IF EXISTS $trigger_name");
			if ($dbh->do($q)) {
				$data->{'result'} = 1;
				$data->{'data'} = {
					'table_name' => $table_name,
					'trigger_name' => $trigger_name,
				};
			} else {
				$data->{'result'} = 0;
				$data->{'data'} = error_sql->errconn();
			}
		}
	}
	return $data;
}


1;