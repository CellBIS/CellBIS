package  # hide from PAUSE
CellBIS::DBIO::Table;

use Mojo::Base '-strict';

use Data::Dumper;
use Scalar::Util qw(blessed);
use Carp ();
use Mojo::Util qw(dumper);
use CellBIS::DBIO::Table::Utils;
use CellBIS::DBIO::Table::Action;
use CellBIS::DBIO::Error;

# ABSTRACT : Part of DBIO to handling table query.
our $VERSION = '0.1000';

sub utils {"CellBIS::DBIO::Table::Utils"}
sub action {"CellBIS::DBIO::Table::Action"}
sub action_query {"CellBIS::DBIO::QueryString"}
sub error_sql {"CellBIS::DBIO::Error"}

# Controller :
# ------------------------------------------------------------------------
sub new {
  my $class = shift;
  my $self = {
    dbh       => shift,
    connector => shift,
  };
  bless $self, $class;
  return $self;
}

# For Create Table :
# ------------------------------------------------------------------------
sub create {
  my $self = shift;
  unshift(@_, $self->{dbh}) unless blessed($_[0]);
  push(@_, $self->{connector});
  
  my $arg_len = scalar @_;
  my $data = { 'result' => 2 };
  
  unless ($arg_len < 5) {
    $arg_len = 7 if $arg_len > 7;
    
    my $arg_name = 'create_arg' . $arg_len;
    if (action->can($arg_name)) {
      $data = action->$arg_name(@_);
    }
  }
  return $data;
}

# For Check Table :
# ------------------------------------------------------------------------
sub check {
  my $self = shift;
  unshift(@_, $self->{connector}->{db_config}) unless ref($_[0]) eq "HASH";
  unshift(@_, $self->{dbh}) unless blessed($_[0]);
  my ($dbh, $db_config, $table_name) = @_;
  my $connector = $self->{connector};
  my %data = ();
  
  #	print Dumper \@_;
  
  if ($connector->{db_type} eq 'sqlite') {
    my $sth = $dbh->prepare('SELECT * FROM sqlite_master WHERE tbl_name=? AND type=?');
    $sth->execute($table_name, 'table');
    my $rv = $sth->rows;
    
    if ($rv >= 1) {
      $data{'result'} = 1;
      $data{'table_name'} = $table_name;
    }
    else {
      $data{'result'} = 0;
      $data{'table_name'} = $table_name;
      $data{'data'} = error_sql->errdata($sth);
    }
  }
  if ($connector->{db_type} eq 'mysql') {
    my $db_name = $db_config->{db_name};
    my $sth = $dbh->prepare('SELECT table_name FROM information_schema.tables WHERE table_schema=? AND table_name=?');
    $sth->execute($db_name, $table_name);
    my $rv = $sth->rows;
    
    if ($rv >= 1) {
      $data{'result'} = 1;
      $data{'table_name'} = $table_name;
    }
    else {
      $data{'result'} = 0;
      $data{'table_name'} = $table_name;
      $data{'data'} = error_sql->errdata($sth);
    }
  }
  return \%data;
}

# For Create Event :
# ------------------------------------------------------------------------
sub create_event {
  my $self = shift;
  unshift(@_, $self->{dbh}) unless blessed($_[0]);
  my $arg_len = scalar @_;
  my $data = { 'result' => 2 };
  
  if ($arg_len == 4) {
    my $event_attr = $_[2];
    my $q = '';
    
    if (utils->event_param_val(@_)) {
      my $check_event = utils->event_attr_val($event_attr);
      unless ($check_event->{result} eq 2) {
        my $subr_act = $check_event->{subr};
        if (action->can($subr_act)) {
          my $dbh = $_[0];
          $q = action->$subr_act(@_);
          $dbh->do("SET GLOBAL event_scheduler = 1;");
          $dbh->do("DROP EVENT IF EXISTS `$_[1]`;");
          #					print "Query : \n$q\n";
          if ($dbh->do($q)) {
            $data->{'result'} = 1;
            $data->{'data'} = $_[1];
          }
          else {
            $data->{'result'} = 0;
            $data->{'data'} = error_sql->errconn();
          }
        }
      }
    }
  }
  
  if ($arg_len >= 5) {
    my $event_attr = $_[2];
    my $q = '';
    
    if (utils->event_param_val(@_)) {
      my $check_event = utils->event_attr_val($event_attr);
      unless ($check_event->{result} eq 2) {
        my $subr_act = $check_event->{subr};
        if (action->can($subr_act)) {
          my $dbh = $_[0];
          $q = action->$subr_act(@_);
          $dbh->do("SET GLOBAL event_scheduler = 1;");
          $dbh->do("DROP EVENT IF EXISTS `$_[1]`;");
          if (ref($_[4]) eq "CODE") {
            my $callback = $_[4];
            my $sql_error = error_sql->errconn();
            $data = $dbh->$callback($q, $sql_error);
          }
          else {
            if ($dbh->do($q)) {
              $data->{'result'} = 1;
              $data->{'data'} = $_[1];
            }
            else {
              $data->{'result'} = 0;
              $data->{'data'} = error_sql->errconn();
            }
          }
        }
      }
    }
  }
  return $data;
}

# For Create Trigger :
# ------------------------------------------------------------------------
sub create_trigger {
  my $self = shift;
  unshift(@_, $self->{dbh}) unless blessed($_[0]);
  my $arg_len = scalar @_;
  my $data = { 'result' => 2, msg => 'Error - Create Trigger' };
  
  my $arg_check = utils->trigger_arg_val(@_);
  #  print "Hasil Check Arg\n";
  #  print Dumper $arg_check;
  #  print "--\n";
  if ($arg_check->{'result'} == 1) {
    my $arg_num = $arg_check->{arg};
    #    print "\$arg_num = $arg_num\n";
    my $subr_act = 'create_trigger_arg' . $arg_check->{'arg'};
    if (action->can($subr_act)) {
      $data = action->$subr_act(@_);
    }
  }
  return $data;
}

# For Create View SQL :
# ------------------------------------------------------------------------
sub create_view {
  my $self = shift;
  unshift(@_, $self->{dbh}) unless blessed($_[0]);
  my $arg_len = scalar @_;
  my $dbh = '';
  my $view_name = '';
  my $table_name = '';
  my $type;
  my $query;
  
  my $data_query = '';
  my %data = ('result' => 2, msg => 'Error - Create View');
  
  if ($arg_len == 5) {
    ($dbh, $view_name, $table_name, $type, $query) = @_;
    $data_query = action_query->insert(@{$query}) if $type eq 'insert';
    $data_query = action_query->update(@{$query}) if $type eq 'update';
    $data_query = action_query->delete(@{$query}) if $type eq 'delete';
    $data_query = action_query->select(@{$query}) if $type eq 'select';
    $data_query = action_query->select_join(@{$query}) if $type eq 'select_join';
    
    if ($data_query ne '') {
      $dbh->do("DROP VIEW IF EXISTS $view_name");
      my $q = "CREATE VIEW $view_name AS $data_query";
      #			say "Query View : \n $q";
      if ($dbh->do($q)) {
        $data{'result'} = 1;
        $data{'msg'} = "Success - Create View | $view_name";
        $data{'data'} = {
          view_name  => $view_name,
          table_name => $table_name,
        }
      }
      else {
        $data{'result'} = 0;
        $data{'msg'} = "WARNING - Create View | $view_name";
        $data{'data'} = '';
      }
    }
    else {
      $data{'msg'} = "WARNING - Create View | $view_name is not found Query string";
    }
  }
  return \%data;
}

# For Create Storage Procedure SQL :
# ------------------------------------------------------------------------
sub create_procedure {
  my $self = shift;
  unshift(@_, $self->{dbh}) unless blessed($_[0]);
  my $arg_len = scalar @_;
  my $dbh = '';
  my $procedure_name = '';
  my $arg_procedure;
  my $query;
  
  my %data = ('result' => 2, msg => 'Error - Create Storage Procedure');
  
  if ($arg_len == 4) {
    ($dbh, $procedure_name, $arg_procedure, $query) = @_;
    
    if ($query ne '') {
      $dbh->do("DROP PROCEDURE IF EXISTS `$procedure_name`");
      my $q = "CREATE PROCEDURE $procedure_name";
      $q .= (scalar @{$arg_procedure}) ? '(' . (join ', ', @{$arg_procedure}) . ')' : "()";
      
      $q .= "\n";
      $q .= "\tBEGIN \n";
      $q .= "$query \n";
      $q .= "\tEND;\n";
      
      #			say "Query Procedure : \n $q\n";
      
      if ($dbh->do($q)) {
        $data{'result'} = 1;
        $data{'msg'} = "Success - Create Storage Procedure | $procedure_name";
        $data{'data'} = {
          procedure_name => $procedure_name,
        }
      }
      else {
        $data{'result'} = 0;
        $data{'msg'} = "WARNING - Create Storage Procedure | $procedure_name";
        $data{'data'} = '';
      }
    }
    else {
      $data{'msg'} = "WARNING - Create Storage Procedure | $procedure_name is not found Query string";
    }
  }
  return \%data;
}

# For Create Function SQL :
# ------------------------------------------------------------------------
sub create_function {
  my $self = shift;
  unshift(@_, $self->{dbh}) unless blessed($_[0]);
  my $arg_len = scalar @_;
  my $dbh = '';
  my $func_name = '';
  my $arg_func;
  my $attr_func;
  my $query;
  my $attr;
  my $size_attr = 0;
  
  my %data = ('result' => 2, msg => 'Error - Create Storage Procedure');
  
  if ($arg_len == 5) {
    ($dbh, $func_name, $arg_func, $attr_func, $query) = @_;
  }
  if ($arg_len >= 6) {
    ($dbh, $func_name, $arg_func, $attr_func, $query, $attr) = @_;
  }
  
  if ($attr and ref($attr) eq "HASH") {
    $size_attr = scalar keys %{$attr};
  }
  
  my $deterministic = "";
  if ($size_attr > 0 and exists $attr->{deterministic} and $attr->{deterministic} == 1) {
    $deterministic = "DETERMINISTIC\n";
  }
  
  if ($query ne '') {
    $dbh->do("DROP FUNCTION IF EXISTS $func_name;");
    my $q = "CREATE FUNCTION $func_name";
    $q .= (scalar @{$arg_func}) ? '(' . (join ', ', @{$arg_func}) . ')' : '()';
    $q .= $attr_func ne '' ? ' ' . $attr_func : ' RETURN INT(1)';
    $q .= " \n";
    $q .= $deterministic;
    
    $q .= "\tBEGIN \n";
    $q .= "\t\t$query\n";
    $q .= "\tEND; \n";
    
    #		say "Query FUNCTION : \n $q\n";
    
    if ($dbh->do($q)) {
      $data{'result'} = 1;
      $data{'msg'} = "Success - Create Function | $func_name";
      $data{'data'} = {
        function_name => $func_name,
      }
    }
    else {
      $data{'result'} = 0;
      $data{'msg'} = "WARNING - Create Function | $func_name";
      $data{'data'} = '';
    }
  }
  else {
    $data{'msg'} = "WARNING - Create Function | $func_name is not found Query string";
  }
  return \%data;
}

# Get Last ID AutoIncrement :
# ------------------------------------------------------------------------
sub last_id_autoIncrement {
  my $self = shift;
  unshift(@_, $self->{dbh}) unless blessed($_[0]);
  my %data = ();
  
  my ($dbh, $table_name) = @_;
  my $q = "SELECT `auto_increment` FROM INFORMATION_SCHEMA.TABLES WHERE table_name = '$table_name'";
  my $sth = $dbh->prepare($q);
  $sth->execute();
  my $r_data = $sth->fetchrow_hashref();
  $data{'data'} = $r_data->{auto_increment};
  return \%data;
}

# Delete Event :
# ------------------------------------------------------------------------
sub drop_event {
  my $self = shift;
  unshift(@_, $self->{dbh}) unless blessed($_[0]);
  
  my ($dbh, $type, $data_event) = @_;
  if ($type eq 'all') {
    my $prefix = $data_event->{prefix};
    my $num = $data_event->{num};
    my $i = 0;
    while ($i < $num) {
      if ($dbh->do("DROP EVENT IF EXISTS " . $prefix . $i)) {
        say "DROP EVENT = $prefix$i";
      }
      $i++;
    }
  }
  if ($type eq 'one') {
    if ($dbh->do("DROP EVENT IF EXISTS $data_event")) {
      say "DROP EVENT = $data_event";
    }
  }
}

# For get database type :
# ------------------------------------------------------------------------
sub get_dbtype {
  my $self = shift;
  return $self->{connector}->{db_type} if exists $self->{connector}->{db_type};
  return $self unless exists $self->{connector}->{db_type};
}

# For Get database config :
# ------------------------------------------------------------------------
sub get_dbconfig {
  my $self = shift;
  return $self->{connector}->{db_config} if exists $self->{connector}->{db_config};
  return $self unless exists $self->{connector}->{db_config};
}

# For Get DBI Attribute :
# ------------------------------------------------------------------------
sub get_DBI_attr {
  my $self = shift;
  return $self->{connector}->{dbi_attr} if exists $self->{connector}->{dbi_attr};
  return $self unless exists $self->{connector}->{dbi_attr};
}

1;