package # Hide from PAUSE
CellBIS::DBIO::QueryString;

use strict;
use warnings;

use Data::Dumper;
use Carp ();
use JSON::XS;
use Scalar::Util qw(blessed);
use String::Util qw(trim);
use CellBIS::DBIO::Table::Utils;

# ABSTRACT: Module for Create Query String;
our $VERSION = '0.1000';

sub utils {return "CellBIS::DBIO::Query::Utils"}
sub action {"CellBIS::DBIO::Query::Action"}

# Constructor :
# ------------------------------------------------------------------------
sub new {
  my $class = shift;
  return bless {}, ref $class || $class;
}

# For Query Insert :
# ------------------------------------------------------------------------
sub insert {
  my $self = shift;
  my $arg_len = scalar @_;
  my $data = '';
  my ($table_name, $column, $col_val, $type);
  if ($arg_len == 3) {
    ($table_name, $column, $col_val) = @_;
  }
  if ($arg_len >= 4) {
    ($table_name, $column, $col_val, $type) = @_;
  }
  my @table_field = @{$column};
  my @table_data = @{$col_val};
  my @get_data_value = ();
  my $field_col = join ', ', @table_field;
  my $value_col = '';
  
  if ((scalar @table_field) == (scalar @table_data)) {
    
    if ($type and $type ne '' and $type eq 'no-pre-st') {
      $value_col = join ', ', @table_data;
    }
    elsif ($type and $type ne '' and $type eq 'pre-st') {
      @get_data_value = utils->replace_data_value_insert(\@table_data);
      $value_col = join ', ', @get_data_value;
    }
    else {
      @get_data_value = utils->replace_data_value_insert(\@table_data);
      $value_col = join ', ', @get_data_value;
    }
    
    $field_col = trim($field_col);
    $value_col = trim($value_col);
    $value_col =~ s/\,$//g;
    $value_col =~ s/\s\,//g;
    
    $data = "INSERT INTO $table_name($field_col) VALUES($value_col)";
  }
  return $data;
}

# For Query Update :
# ------------------------------------------------------------------------
sub update {
  my $self = shift;
  my $arg_len = scalar @_;
  my ($table_name, $column, $value, $clause, $type);
  
  if ($arg_len == 4) {
    ($table_name, $column, $value, $clause) = @_;
  }
  if ($arg_len == 5) {
    ($table_name, $column, $value, $clause, $type) = @_;
  }
  my $data = '';
  
  my @table_field = @{$column};
  my $field_change = '';
  my $where_clause = '';
  
  if ($type and $type ne '' and $type eq 'no-pre-st') {
    my @get_value = utils->col_with_val(@table_field, @{$value});
    $field_change = join ', ', @get_value;
    
    if (exists $clause->{where}) {
      $where_clause = utils->create_clause($clause);
      $data = "UPDATE $table_name SET $field_change" . $where_clause;
    }
    
  }
  elsif ($type and $type ne '' and $type eq 'pre-st') {
    $field_change = join '=?, ', @table_field;
    $field_change .= '=?';
    
    if (exists $clause->{where}) {
      $where_clause = utils->create_clause($clause);
      $data = "UPDATE $table_name SET $field_change" . $where_clause;
    }
  }
  else {
    $field_change = join '=?, ', @table_field;
    $field_change .= '=?';
    
    if (exists $clause->{where}) {
      $where_clause = utils->create_clause($clause);
      $data = "UPDATE $table_name SET $field_change" . $where_clause;
    }
  }
  return $data;
}

# For Query Delete :
# ------------------------------------------------------------------------
sub delete {
  my $self = shift;
  my ($table_name, $clause) = @_;
  my $data = '';
  
  if (ref($clause) eq "HASH") {
#    my $size_clause = scalar keys %{$clause};
    if (exists $clause->{where}) {
      my $where_clause = utils->create_clause($clause);
      $data = "DELETE FROM $table_name" . $where_clause;
    }
  }
  return $data;
}

# For Query Select :
# ------------------------------------------------------------------------
sub select {
  my $self = shift;
  my $arg_len = scalar @_;
  my $data;
  
  unless ($arg_len < 2) {
    $arg_len = 3 if $arg_len >= 3;
    
    my $arg_name = 'qSelect_arg' . $arg_len;
    if (action->can($arg_name)) {
      $data = action->$arg_name(@_);
    }
  }
  return $data;
}

# For Query Select Join :
# ------------------------------------------------------------------------
sub select_join {
  my $self = shift;
  my $arg_len = scalar @_;
  my $data = '';
  
  unless ($arg_len < 3) {
    $arg_len = 3 if $arg_len >= 3;
    
    my $arg_name = 'qSelectJoin_arg3';
    if (action->can($arg_name)) {
      $data = action->$arg_name(@_);
    }
  }
  return $data;
}

1;