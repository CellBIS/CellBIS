package  # hide from PAUSE
CellBIS::DBIO::Query::Action;

use strict;
use warnings;

use Data::Dumper;
use Carp ();
use JSON::XS;
use String::Util qw(trim);
use CellBIS::DBIO::Error;
use CellBIS::DBIO::Query::Utils;

# ABSTRACT: Module for Action Query Class.
our $VERSION = '0.1000';

sub error_sql {return "CellBIS::DBIO::Error"}
sub utils {return "CellBIS::DBIO::Query::Utils"}

# For Action "insert()" with 4 arg :
# ------------------------------------------------------------------------
sub insert_arg4 {
  my ($self, $dbh, $table_name, $column, $col_val) = @_;
  
  my @table_field = @{$column};
  my @table_data = @{$col_val};
  my %data = (
    'result' => 2
  );
  
  my $size_col = scalar @table_field;
  my $size_val = scalar @table_data;
  my $field_col = join ', ', @table_field;
  
  my @get_PrepareSt = utils->insert_data_prepare_statement(\@table_data);
  #	my @get_noPrepareSt = utils->insert_data_no_prepare_statement(\@table_data);
  #	my $size_PrepareSt = scalar @get_PrepareSt;
  #	my $size_noPrepareSt = scalar @get_noPrepareSt;
  #	my $value_col_PrepareSt = '?, ' x $size_PrepareSt;
  #	my $value_col_noPrepareSt = join ', ', @get_noPrepareSt;
  #	my $value_col = '';
  #	if ($size_noPrepareSt >= 1) {
  #		$value_col = $value_col_PrepareSt.', '.$value_col_noPrepareSt;
  #	} else {
  #		$value_col = $value_col_PrepareSt;
  #	}
  
  my @get_data_value = utils->replace_data_value_insert(\@table_data);
  my $value_col = join ', ', @get_data_value;
  $value_col = trim($value_col);
  $value_col =~ s/\s\,//g;
  
  if ($size_col == $size_val) {
    
    my $q = "INSERT INTO $table_name($field_col) VALUES($value_col)";
    my $sth = $dbh->prepare($q);
    $sth->execute(@get_PrepareSt);
    my $rv = $sth->rows;
    if ($rv >= 1) {
      my $new_id = $dbh->{mysql_insertid};
      $data{'result'} = 1;
      $data{'id'} = $new_id;
    }
    else {
      $data{'result'} = 0;
    }
    $sth->finish();
    return \%data;
  }
  elsif ($size_col > $size_val) {
    
    my $q = "INSERT INTO $table_name($field_col) VALUES($value_col)";
    my $sth = $dbh->prepare($q);
    $sth->execute(@get_PrepareSt);
    my $rv = $sth->rows;
    if ($rv >= 1) {
      my $new_id = $dbh->{mysql_insertid};
      $data{'result'} = 1;
      $data{'id'} = $new_id;
    }
    else {
      $data{'result'} = 0;
    }
    $sth->finish();
    return \%data;
  }
  else {
    return \%data;
  }
}

# For Action "insert()" with 5 arg :
# ------------------------------------------------------------------------
sub insert_arg5 {
  my $self = shift;
  my $attr = {};
  my $callback = {};
  
  my $dbh = $_[0];
  my $table_name = $_[1];
  my $column = $_[2];
  my $col_val = $_[3];
  if (ref($_[4]) eq "CODE") {
    $attr = {};
    $callback = $_[4];
  }
  else {
    $attr = $_[4];
    $callback = {};
  }
  
  #	print Dumper \@_;
  
  my @table_field = @{$column};
  my @table_data = @{$col_val};
  my %data = (
    'result' => 2
  );
  
  my $size_col = scalar @table_field;
  my $size_val = scalar @table_data;
  my $field_col = join ', ', @table_field;
  
  my @get_PrepareSt = utils->insert_data_prepare_statement(\@table_data);
  #	my @get_noPrepareSt = utils->insert_data_no_prepare_statement(\@table_data);
  #	my $size_PrepareSt = scalar @get_PrepareSt;
  #	my $size_noPrepareSt = scalar @get_noPrepareSt;
  #	my $value_col_PrepareSt = '?, ' x $size_PrepareSt;
  #	my $value_col_noPrepareSt = join ', ', @get_noPrepareSt;
  #	my $value_col = '';
  #	if ($size_noPrepareSt >= 1) {
  #		$value_col = $value_col_PrepareSt.', '.$value_col_noPrepareSt;
  #	} else {
  #		$value_col = $value_col_PrepareSt;
  #	}
  
  my @get_data_value = utils->replace_data_value_insert(\@table_data);
  my $value_col = join ', ', @get_data_value;
  
  $field_col = trim($field_col);
  $value_col = trim($value_col);
  $value_col =~ s/\,$//g;
  $value_col =~ s/\s\,//g;
  
  if ($size_col == $size_val) {
    
    # For only return "Query String" :
    if (ref($_[4]) eq "HASH" and exists $_[4]->{callback} and $_[4]->{callback} eq 'query') {
      my $q = "INSERT INTO $table_name($field_col) VALUES($value_col)";
      $data{'result'} = 1;
      $data{'type'} = 'query';
      $data{'data'} = $q;
      return \%data;
    }
    
    # For Action Database :
    else {
      my $q = "INSERT INTO $table_name($field_col) VALUES($value_col)";
      my $sth = $dbh->prepare($q);
      $sth->execute(@get_PrepareSt);
      
      if (ref($_[4]) eq "CODE") {
        return $dbh->$callback($sth);
      }
      else {
        if (ref($_[4] eq "HASH")) {
          $attr = utils->attr_val($attr);
          my $size_attr = scalar keys %{$attr};
          unless ($size_attr == 0) {
            if ($attr->{fetch_data} eq 'dbi') {
              return $sth;
            }
            else {
              my $action = utils->action_InQuery();
              return $action->{insert}($dbh, $sth);
            }
          }
          else {
            my $action = utils->action_InQuery();
            return $action->{insert}($dbh, $sth);
          }
        }
        else {
          my $action = utils->action_InQuery();
          return $action->{insert}($dbh, $sth);
        }
      }
    }
  }
  else {
    return \%data;
  }
}

# For Action "insert()" with 6 arg :
# ------------------------------------------------------------------------
sub insert_arg6 {
  my ($self, $dbh, $table_name, $column, $col_val, $attr, $callback) = @_;
  
  my @table_field = @{$column};
  my @table_data = @{$col_val};
  my %data = (
    'result' => 2
  );
  #	print Dumper \@_;
  
  my $size_col = scalar @table_field;
  my $size_val = scalar @table_data;
  my $field_col = join ', ', @table_field;
  
  my @get_PrepareSt = utils->insert_data_prepare_statement(\@table_data);
  my @get_noPrepareSt = utils->insert_data_no_prepare_statement(\@table_data);
  my $size_PrepareSt = scalar @get_PrepareSt;
  my $size_noPrepareSt = scalar @get_noPrepareSt;
  #	my $value_col_PrepareSt = '?, ' x $size_PrepareSt;
  #	my $value_col_noPrepareSt = join ', ', @get_noPrepareSt;
  #	my $value_col = '';
  #	if ($size_noPrepareSt >= 1) {
  #		$value_col = $value_col_PrepareSt.', '.$value_col_noPrepareSt;
  #	} else {
  #		$value_col = $value_col_PrepareSt;
  #	}
  my @get_data_value = utils->replace_data_value_insert(\@table_data);
  my $value_col = join ', ', @get_data_value;
  #	print "Result get prepare statement :\n";
  #	print Dumper \@get_PrepareSt;
  
  $field_col = trim($field_col);
  $value_col = trim($value_col);
  $value_col =~ s/\,$//g;
  $value_col =~ s/\s\,//g;
  #	print "Value Data = $value_col\n";
  
  my $param = {
    dbh        => $dbh,
    table_name => $table_name,
    col        => $column,
    val        => $col_val,
    attr       => $attr,
    callback   => $callback
  };
  
  my $where_clause = '';
  if ($size_col == $size_val) {
    
    if (exists $attr->{where} && $attr->{where} ne '') {
      $where_clause = ' WHERE NOT EXISTS (' . $attr->{where} . ')';
    }
    my $q = "INSERT INTO $table_name($field_col) VALUES($value_col)" . $where_clause;
    #		print "Query : \n $q\n";
    my $sth = $dbh->prepare($q);
    $sth->execute(@get_PrepareSt);
    
    #		print "Colum Value : \n";
    #		print Dumper \@get_PrepareSt;
    
    $attr = utils->attr_val($attr);
    my $size_attr = scalar keys %{$attr};
    #		print "size attr $size_attr\n";
    unless ($size_attr == 0) {
      if (exists $attr->{callback} and $attr->{callback} eq 'sth') {
        if (ref($callback) eq "CODE") {
          #          print "1. Query: \n $q\n";
          my $sql_error = error_sql;
          return $dbh->$callback($sth, $q, $param, $sql_error);
        }
        else {
          my $action = utils->action_InQuery();
          return $action->{insert}($dbh, $sth);
        }
      }
      elsif (exists $attr->{callback} and $attr->{callback} eq 'data') {
        my $rv = $sth->rows;
        if ($rv >= 1) {
          my $new_id = $dbh->{mysql_insertid};
          my $sql_error = error_sql;
          if (ref($callback) eq "CODE") {
            my $result = $dbh->$callback($sth, $new_id, $q, $param, $sql_error);
            return $result;
          } else {
            $data{'result'} = 1;
            $data{'data'} = $new_id;
            return \%data;
          }
        }
        else {
          $data{'result'} = 0;
          $data{'data'} = error_sql->errdata($sth);
          return \%data;
        }
      }
    }
    else {
      if (ref($callback) eq "CODE") {
        #        print "2. Query: \n $q\n";
        return $dbh->$callback($sth);
      }
      else {
        my $action = utils->action_InQuery();
        return $action->{insert}($dbh, $sth);
      }
    }
  }
  else {
    return \%data;
  }
}

# For Action "update()" with 5 args :
# ------------------------------------------------------------------------
sub update_arg5 {
  my $self = shift;
  my ($dbh, $table_name, $column, $value, $clause) = @_;
  my %data = (
    'result' => 2
  );
  
  my @table_field = @{$column};
  my $field_change = '';
  my $where_clause = '';
  
  if (ref($clause) eq "HASH") {
    my $size_clause = scalar keys %{$clause};
    unless ($size_clause == 0) {
      $field_change = join '=?, ', @table_field;
      $field_change .= '=?';
      if (exists $clause->{where}) {
        $where_clause = utils->create_clause($clause);
        my $sth = $dbh->prepare("UPDATE $table_name SET $field_change" . $where_clause);
        $sth->execute(@{$value});
        my $action = utils->action_InQuery();
        %data = %{$action->{update}($dbh, $sth)};
      }
    }
  }
  return \%data;
}

# For Action "update()" with 6 args :
# ------------------------------------------------------------------------
sub update_arg6 {
  my $self = shift;
  
  my $dbh = $_[0];
  my $table_name = $_[1];
  my $column = $_[2];
  my $value = $_[3];
  my $clause = $_[4];
  my $callback = {};
  my $attr = '';
  my $size_arg4 = '';
  my %data = (
    'result' => 2
  );
  
  if (ref($clause) eq "HASH") {
    $size_arg4 = scalar keys %{$clause};
  }
  else {
    $size_arg4 = 0;
  }
  
  if (ref($_[5]) eq "CODE") {
    $callback = $_[5];
  }
  if (ref($_[5]) eq "HASH" and exists $_[5]->{callback} and $_[5]->{callback} eq 'query') {
    $attr = $_[5];
  }
  
  my @table_field = @{$column};
  my $field_change = '';
  my $query_clause = '';
  
  unless ($size_arg4 == 0) {
    $field_change = join '=?, ', @table_field;
    $field_change .= '=?';
    $query_clause = utils->create_clause($clause);
    
    # For only Return "Query String"
    if (ref($attr) eq "HASH") {
      my $q = "UPDATE $table_name SET $field_change" . $query_clause;
      $data{'result'} = 1;
      $data{'type'} = 'query';
      $data{'data'} = $q;
      return \%data;
    }
    
    # For Action Database :
    else {
      my $q = "UPDATE $table_name SET $field_change" . $query_clause;
      my $sth = $dbh->prepare($q);
      $sth->execute(@{$value});
      #		print "Query :\n $q\n";
      my $sql_error = error_sql;
      if (ref($callback) eq "CODE") {
        return $dbh->$callback($sth, $sql_error);
      }
      else {
        my $action = utils->action_InQuery();
        return $action->{update}($dbh, $sth);
      }
      #			$dbh->disconnect();
    }
  }
  else {
    return \%data;
  }
}

# For Action "delete()" with 4 args :
# ------------------------------------------------------------------------
sub delete_arg4 {
  my ($self, $dbh, $table_name, $value, $clause) = @_;
  my %data = (
    'result' => 3
  );
  my $where_clause = '';
  
  if (ref($clause) eq "HASH") {
    my $size_clause = scalar keys %{$clause};
    unless ($size_clause == 0) {
      if (exists $clause->{where}) {
        $where_clause = utils->create_clause($clause);
        my $sth = $dbh->prepare("DELETE FROM $table_name" . $where_clause);
        $sth->execute(@{$value});
        
        my $action = utils->action_InQuery();
        %data = %{$action->{delete}($dbh, $sth)};
      }
    }
  }
  #	$dbh->disconnect();
  return \%data;
}

# For Action "delete()" with 5 args :
# ------------------------------------------------------------------------
sub delete_arg5 {
  my $self = shift;
  
  my $dbh = $_[0];
  my $table_name = $_[1];
  my $value = $_[2];
  my $clause = $_[3];
  my $callback = {};
  my $attr = '';
  my $size_arg3 = '';
  
  #	print Dumper \@_;
  if (ref($clause) eq "HASH") {
    $size_arg3 = scalar keys %{$clause};
  }
  else {
    $size_arg3 = 0;
  }
  if (defined $_[4] and ref($_[4]) eq "CODE") {
    $callback = $_[4];
  }
  if (defined $_[4] and ref($_[4]) eq "HASH" and exists $_[4]->{callback} and $_[4]->{callback} eq 'query') {
    $attr = $_[4];
  }
  
  my %data = (
    'result' => 2
  );
  my $query_clause = '';
  
  unless ($size_arg3 == 0) {
    # For only return "Query String" :
    if (ref($attr) eq "HASH") {
      $query_clause = utils->create_clause($clause);
      my $q = "DELETE FROM $table_name" . $query_clause;
      #			print "$q\n";
      $data{'result'} = 1;
      $data{'type'} = 'query';
      $data{'data'} = $q;
      return \%data;
    }
    
    # For Action Database :
    else {
      
      $query_clause = utils->create_clause($clause);
      my $q = "DELETE FROM $table_name" . $query_clause;
      #			print "$q\n";
      my $sth = $dbh->prepare($q);
      $sth->execute(@{$value});
      
      my $sql_error = error_sql;
      if (ref($callback) eq "CODE") {
        return $dbh->$callback($sth, $sql_error);
      }
      else {
        my $action = utils->action_InQuery();
        return $action->{delete}($dbh, $sth);
      }
    }
  }
  else {
    #		$dbh->disconnect();
    return \%data;
  }
}

# For Action "select()" with arg 3 :
# ------------------------------------------------------------------------
sub select_arg3 {
  my ($self, $dbh, $table_name, $column) = @_;
  
  my @col = @{$column};
  my $size_col = scalar @col;
  my $q = '';
  
  if ($size_col == 0) {
    $q = "SELECT * FROM $table_name";
  }
  if ($size_col >= 1) {
    my $field_table = join ', ', @col;
    $q = "SELECT $field_table FROM $table_name";
  }
  my $sth = $dbh->prepare($q);
  $sth->execute();
  my $action = utils->action_InQuery();
  return $action->{select}($dbh, $sth);
}

# For Action "select()" with arg 4 :
# ------------------------------------------------------------------------
sub select_arg4 {
  my $self = shift;
  
  my $dbh = $_[0];
  my $table_name = $_[1];
  my $column = $_[2];
  my $clause = {};
  
  my %data = (
    'result' => 2
  );
  my $q = '';
  my $sth = '';
  
  if (ref($_[3]) eq "HASH") {
    #    $clause = $_[3];
    my $size_clause = scalar keys %{$_[3]};
    
    unless ($size_clause == 0) {
      
      # IF there are clause "where" :
      if (exists $_[3]->{where}) {
        
        my @col = @{$column};
        my $size_col = scalar @col;
        my $field_change = '';
        my $where_clause = '';
        
        if ($size_col == 0) {
          $where_clause = utils->create_clause($clause);
          $q = "SELECT * FROM $table_name" . $where_clause;
        }
        
        if ($size_col >= 1) {
          $field_change = join ', ', @col;
          $where_clause = utils->create_clause($clause);
          $q = "SELECT $field_change FROM $table_name" . $where_clause;
        }
      }
      
      # IF there are clause "orderby" or "order" :
      else {
        if (exists $_[3]->{orderby} or exists $_[3]->{order}) {
          
          my @col = @{$column};
          my $size_col = scalar @col;
          my $field_change = '';
          my $where_clause = '';
          
          if ($size_col == 0) {
            $where_clause = utils->create_clause($clause);
            $q = "SELECT * FROM $table_name" . $where_clause;
          }
          
          if ($size_col >= 1) {
            $field_change = join ', ', @col;
            $where_clause = utils->create_clause($clause);
            $q = "SELECT $field_change FROM $table_name" . $where_clause;
          }
          
        }
        else {
          $q = "SELECT * FROM $table_name";
        }
      }
      
      # For only return "Query String" :
      if (exists $_[3]->{callback} and $_[3]->{callback} eq 'query') {
        
        $data{'result'} = 1;
        $data{'type'} = 'query';
        $data{'data'} = $q;
        return \%data;
      }
      
      # For Action Database :
      else {
        $sth = $dbh->prepare($q);
        $sth->execute();
        
        my $action = utils->action_InQuery();
        %data = %{$action->{select}($dbh, $sth)};
      }
      
    }
    else {
      $q = "SELECT * FROM $table_name";
      $sth = $dbh->prepare($q);
      $sth->execute();
      
      my $action = utils->action_InQuery();
      %data = %{$action->{select}($dbh, $sth)};
    }
    
  }
  else {
    $q = "SELECT * FROM $table_name";
    $sth = $dbh->prepare($q);
    $sth->execute();
    
    my $action = utils->action_InQuery();
    %data = %{$action->{select}($dbh, $sth)};
  }
  #	$dbh->disconnect();
  return \%data;
}

# For Action "select()" with arg 5 :
# ------------------------------------------------------------------------
sub select_arg5 {
  my $self = shift;
  
  my $dbh = $_[0];
  my $table_name = $_[1];
  my $column = $_[2];
  my $value = $_[3];
  my $clause = $_[4];
  #  Carp::croak Dumper encode_json(@_);
  
  my $size_arg3 = 0;
  my $size_arg4 = 0;
  my $size_arg5 = 0;
  my $q = '';
  my $sth;
  my %data = ('result' => 2);
  
  if (ref($clause) eq "HASH") {
    $size_arg5 = scalar keys %{$clause};
    
    $size_arg3 = 0 unless (ref($column) eq "ARRAY");
    $size_arg3 = scalar @{$column} if (ref($column) eq "ARRAY");
    
    $size_arg4 = 0 unless (ref($value) eq "ARRAY");
    $size_arg4 = scalar @{$value} if (ref($value) eq "ARRAY");
    
    my $field_table = '';
    my @value_col = ();
    
    $field_table = '*' if $size_arg3 == 0;
    $field_table = join ', ', @{$column} unless $size_arg3 == 0;
    
    @value_col = () if $size_arg4 == 0;
    @value_col = @{$value} unless $size_arg4 == 0;
    my $status = '';
    
    if (exists $clause->{where}) {
      my $where_clause = CellBIS::DBIO::Query::Utils->create_clause($clause);
      $q = "SELECT $field_table FROM $table_name" . $where_clause;
      $status = 1;
    }
    else {
      if (exists $clause->{limit} or exists $clause->{orderby} or exists $clause->{order}) {
        my $where_clause = CellBIS::DBIO::Query::Utils->create_clause($clause);
        $q = "SELECT $field_table FROM $table_name" . $where_clause;
        $status = 2;
      }
      else {
        $q = "SELECT $field_table FROM $table_name";
        $status = 0;
      }
    }
    
    # For only return "Query String"
    if (exists $clause->{callback} and $clause->{callback} eq 'query') {
      $data{'result'} = 1;
      $data{'type'} = 'query';
      $data{'data'} = $q;
      
    }
    
    # For Action Database
    else {
      if ($status == 0) {
        $sth = $dbh->prepare($q);
        $sth->execute();
      }
      else {
        $sth = $dbh->prepare($q);
        $sth->execute(@value_col);
      }
      
      my $action = CellBIS::DBIO::Query::Utils->action_InQuery();
      %data = %{$action->{select}($dbh, $sth)};
    }
    
  }
  else {
    Carp::croak "table_name $_[1]";
    $q = "SELECT * FROM $table_name";
    $sth = $dbh->prepare($q);
    $sth->execute();
    
    my $action = CellBIS::DBIO::Query::Utils->action_InQuery();
    %data = %{$action->{select}($dbh, $sth)};
  }
  #	$dbh->disconnect();
  return \%data;
}

# For Action "select()" with arg 6 :
# ------------------------------------------------------------------------
sub select_arg6 {
  my $self = shift;
  
  my $dbh = $_[0];
  my $table_name = $_[1];
  my $column = $_[2];
  my $value = $_[3];
  my $clause = $_[4];
  my $callback = $_[5];
  
  my $size_arg3 = 0;
  my $size_arg4 = 0;
  my $size_arg5 = 0;
  my $q = '';
  my $sth;
  
  my $param = {
    dbh        => $dbh,
    table_name => $table_name,
    col        => $column,
    val        => $value,
    clause     => $clause,
    callback   => $callback
  };
  
  if (ref($callback) eq "CODE") {
    if (ref($clause) eq "HASH") {
      $size_arg5 = scalar keys %{$clause};
      
      $size_arg3 = 0 unless (ref($column) eq "ARRAY");
      $size_arg3 = scalar @{$column} if (ref($column) eq "ARRAY");
      
      $size_arg4 = 0 unless (ref($value) eq "ARRAY");
      $size_arg4 = scalar @{$value} if (ref($value) eq "ARRAY");
      
      my $field_table = '';
      my @value_col = ();
      
      $field_table = '*' if $size_arg3 == 0;
      $field_table = join ', ', @{$column} unless $size_arg3 == 0;
      
      @value_col = () if $size_arg4 == 0;
      @value_col = @{$value} unless $size_arg4 == 0;
      
      if (exists $clause->{where}) {
        my $where_clause = utils->create_clause($clause);
        $q = "SELECT $field_table FROM $table_name" . $where_clause;
        $sth = $dbh->prepare($q);
        $sth->execute(@value_col);
        my $sql_error = error_sql;
        #				print "$q\n";
        return $dbh->$callback($sth, $q, $param, $sql_error);
      }
      else {
        if (exists $clause->{limit} or exists $clause->{orderby}) {
          my $where_clause = utils->create_clause($clause);
          $q = "SELECT $field_table FROM $table_name" . $where_clause;
          $sth = $dbh->prepare($q);
          $sth->execute(@value_col);
          my $sql_error = error_sql;
          #					print "q\n";
          return $dbh->$callback($sth, $q, $param, $sql_error);
        }
        else {
          $q = "SELECT $field_table FROM $table_name";
          $sth = $dbh->prepare($q);
          $sth->execute();
          my $sql_error = error_sql;
          #					print "q\n";
          return $dbh->$callback($sth, $q, $param, $sql_error);
        }
      }
    }
    else {
      $q = "SELECT * FROM $table_name";
      $sth = $dbh->prepare($q);
      $sth->execute();
      my $sql_error = error_sql;
      #			print "q\n";
      return $dbh->$callback($sth, $q, $param, $sql_error);
    }
  }
  else {
    return $self->select_arg5(@_);
  }
}

# For Action "select_join()" arg 5 :
# ------------------------------------------------------------------------
sub select_join_arg5 {
  my $self = shift;
  my %data = ();
  
  my $dbh = $_[0];
  my $table_name = $_[1];
  my $column = $_[2];
  my $value = $_[3];
  my $clause = $_[4];
  
  my $size_arg3 = 0;
  my $size_arg4 = 0;
  my $size_arg5 = 0;
  my $q = '';
  my $sth;
  
  if (ref($clause) eq "HASH") {
    $size_arg5 = scalar keys %{$clause};
    
    $size_arg3 = 0 unless (ref($column) eq "ARRAY");
    $size_arg3 = scalar @{$column} if (ref($column) eq "ARRAY");
    
    $size_arg4 = 0 unless (ref($value) eq "ARRAY");
    $size_arg4 = scalar @{$value} if (ref($value) eq "ARRAY");
    
    my $field_table = '';
    my @value_col = ();
    
    $field_table = '*' if $size_arg3 == 0;
    $field_table = join ', ', @{$column} unless $size_arg3 == 0;
    
    @value_col = () if $size_arg4 == 0;
    @value_col = @{$value} unless $size_arg4 == 0;
    
    if (exists $clause->{join}) {
      my $join_clause = utils->for_onjoin($clause, $table_name);
      my $where_clause = utils->create_clause($clause);
      if (exists $clause->{where}) {
        $q = "SELECT $field_table $join_clause" . $where_clause;
      }
      else {
        $q = "SELECT $field_table $join_clause" . $where_clause;
      }
      
      # For only return "Query String" :
      if (exists $clause->{callback} and $clause->{callback} eq 'query') {
        $data{'result'} = 1;
        $data{'type'} = 'query';
        $data{'data'} = $q;
        return \%data;
      }
      
      # For Action Database :
      else {
        $sth = $dbh->prepare($q);
        $sth->execute();
        
        my $action = utils->action_InQuery();
        return $action->{select}($dbh, $sth);
      }
    }
    else {
      if (exists $clause->{where}) {
        my $where_clause = utils->create_clause($clause);
        $q = "SELECT $field_table FROM $table_name" . $where_clause;
        
        # For only return "Query String" :
        if (exists $clause->{callback} and $clause->{callback} eq 'query') {
          $data{'result'} = 1;
          $data{'type'} = 'query';
          $data{'data'} = $q;
        }
        else {
          $sth = $dbh->prepare($q);
          $sth->execute(@value_col);
          
          my $action = utils->action_InQuery();
          return $action->{select}($dbh, $sth);
        }
      }
      else {
        if (exists $clause->{order} or exists $clause->{orderby}) {
          
          my $where_clause = utils->create_clause($clause);
          $q = "SELECT $field_table FROM $table_name" . $where_clause;
          
          # For only return "Query String" :
          if (exists $clause->{callback} and $clause->{callback} eq 'query') {
            $data{'result'} = 1;
            $data{'type'} = 'query';
            $data{'data'} = $q;
          }
          else {
            $sth = $dbh->prepare($q);
            $sth->execute(@value_col);
            
            my $action = utils->action_InQuery();
            return $action->{select}($dbh, $sth);
          }
        }
        else {
          return $self->select_arg3(@_);
        }
      }
    }
  }
  else {
    return $self->select_arg3(@_);
  }
}

# For Action "select_join()" arg 6 :
# ------------------------------------------------------------------------
sub select_join_arg6 {
  my $self = shift;
  
  my $dbh = $_[0];
  my $table_name = $_[1];
  my $column = $_[2];
  my $value = $_[3];
  my $clause = $_[4];
  my $callback = {};
  
  my $size_arg3 = 0;
  my $size_arg4 = 0;
  my $size_arg5 = 0;
  my $q = '';
  my $sth;
  
  my $param = {
    dbh        => $dbh,
    table_name => $table_name,
    col        => $column,
    val        => $value,
    clause     => $clause,
    callback   => $callback
  };
  
  if (ref($_[5]) eq "CODE") {
    $callback = $_[5];
    if (ref($clause) eq "HASH") {
      $size_arg5 = scalar keys %{$clause};
      
      $size_arg3 = 0 unless (ref($column) eq "ARRAY");
      $size_arg3 = scalar @{$column} if (ref($column) eq "ARRAY");
      
      $size_arg4 = 0 unless (ref($value) eq "ARRAY");
      $size_arg4 = scalar @{$value} if (ref($value) eq "ARRAY");
      
      my $field_table = '';
      my @value_col = ();
      
      $field_table = '*' if $size_arg3 == 0;
      $field_table = join ', ', @{$column} unless $size_arg3 == 0;
      
      @value_col = () if $size_arg4 == 0;
      @value_col = @{$value} unless $size_arg4 == 0;
      
      if (exists $clause->{join}) {
        my $join_clause = utils->for_onjoin($clause, $table_name);
        my $where_clause = utils->create_clause($clause);
        if (exists $clause->{where}) {
          $q = "SELECT $field_table $join_clause" . $where_clause;
        }
        else {
          $q = "SELECT $field_table $join_clause" . $where_clause;
        }
        $sth = $dbh->prepare($q);
        $sth->execute(@value_col);
        #        print "Query :\n $q\n";
        my $sql_error = error_sql;
        return $dbh->$callback($sth, $q, $param, $sql_error);
      }
      else {
        if (exists $clause->{where}) {
          my $where_clause = utils->create_clause($clause);
          $q = "SELECT $field_table FROM $table_name" . $where_clause;
          $sth = $dbh->prepare($q);
          $sth->execute(@value_col);
          my $sql_error = error_sql;
          return $dbh->$callback($sth, $q, $sql_error);
        }
        else {
          return $self->select_arg3(@_);
        }
      }
    }
    else {
      return $self->select_arg3(@_);
    }
  }
  else {
    return $self->select_join_arg5(@_);
  }
}

# For Action Query String - "select" - arg2 :
# ------------------------------------------------------------------------
sub qSelect_arg2 {
  my $self = shift;
  my ($table_name, $column) = @_;
  
  my @col = @{$column};
  my $size_col = scalar @col;
  my $q = '';
  
  if ($size_col == 0) {
    $q = "SELECT * FROM $table_name";
  }
  if ($size_col >= 1) {
    my $field_table = join ', ', @col;
    $q = "SELECT $field_table FROM $table_name";
  }
  return $q;
}

# For Action Query String - "select" - arg3 :
# ------------------------------------------------------------------------
sub qSelect_arg3 {
  my $self = shift;
  my ($table_name, $column, $clause) = @_;
  my $data = '';
  my @col = @{$column};
  my $size_col = scalar @col;
  my $field_change = '';
  my $where_clause = '';
  
  if (ref($clause) eq "HASH") {
    my $size_clause = scalar keys %{$clause};
    
    unless ($size_clause == 0) {
      $where_clause = utils->create_clause($clause);
      $field_change = join ', ', @col;
      $data = "SELECT $field_change FROM $table_name" . $where_clause;
      
    }
    else {
      
      if ($size_col == 0) {
        $data = "SELECT * FROM $table_name";
      }
      
      if ($size_col >= 1) {
        $field_change = join ', ', @col;
        $data = "SELECT $field_change FROM $table_name";
      }
    }
  }
  else {
    if ($size_col == 0) {
      $data = "SELECT * FROM $table_name";
    }
    
    if ($size_col >= 1) {
      $field_change = join ', ', @col;
      $data = "SELECT $field_change FROM $table_name";
    }
  }
  return $data;
}

# For Action Query String - "select_join" - arg3 :
# ------------------------------------------------------------------------
sub qSelectJoin_arg3 {
  my $self = shift;
  my ($table_name, $column, $clause) = @_;
  my $data = '';
  
  my $size_col = scalar @{$column};
  my $field_change = '';
  $field_change = '*' if $size_col == 0;
  $field_change = join ', ', @{$column} if $size_col >= 1;
  my $where_clause = '';
  my $join_clause = '';
  
  if (ref($clause) eq "HASH") {
    if (exists $clause->{join}) {
      $join_clause = utils->for_onjoin($clause, $table_name);
      $where_clause = utils->create_clause($clause);
      $data = "SELECT $field_change $join_clause" . $where_clause;
    }
    else {
      $where_clause = utils->create_clause($clause);
      $data = "SELECT $field_change FROM $table_name";
    }
  }
  else {
    $data = "SELECT $field_change FROM $table_name";
  }
  return $data;
}

1;