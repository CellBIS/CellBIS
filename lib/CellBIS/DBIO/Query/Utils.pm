package  # hide from PAUSE
CellBIS::DBIO::Query::Utils;

use strict;
use warnings FATAL => 'all';

use Data::Dumper;
use CellBIS::DBIO::Error;

sub error_sql {"CellBIS::DBIO::Error"}

# For onjoin clause :
# ------------------------------------------------------------------------
sub for_onjoin {
  my $self = shift;
  my ($options, $table_name) = @_;
  my $data = "FROM " . $table_name->[0]->{name};
  #	  print Dumper \@_;
  #	  print Dumper $options;
  
  my %type = %{$options->{typejoin}};
  my $join = $options->{join};
  my $size_join = @{$join};
  
  my @table_list = @{$table_name};
  my $size_table = scalar keys(%type);
  my %list_table = map {$table_list[$_]->{name} => $table_list[$_]} keys @table_list;
  my @get_primaryTbl = grep {$_->{primary} && $_->{primary} == 1} @table_list;
  
  # Check IF founded primary table :
  if (@get_primaryTbl) {
    my $tbl_name = '';
    my $tbl_alias = '';
    my $get_table_data = '';
    
    # For "FROM TABLE"
    $data = "FROM $get_primaryTbl[0]->{name}";
    if (exists $get_primaryTbl[0]->{alias}) {
      $data = "FROM $get_primaryTbl[0]->{name} AS $get_primaryTbl[0]->{alias}";
    }
    
    my $i = 0;
    my $table_join = '';
    my $type_join = '';
    #  print "Jumlah Table = $size_table\n";
    while ($i < $size_join) {
      my $get_table = $join->[$i];
      $tbl_name = $get_table->{name};
      $table_join = $get_table->{onjoin};
      $get_table_data = $list_table{$tbl_name};
      $type_join = $self->type_join($type{$tbl_name});
      
      if (exists $get_table_data->{alias}) {
        $tbl_alias = $get_table_data->{alias};
        $data .= " $type_join $tbl_name AS $tbl_alias ";
        $data .= 'ON ' if ($i > 1 or $i <= ($size_join - 1));
        $data .= join " = ", @$table_join;
      }
      else {
        $data .= " $type_join $tbl_name ";
        $data .= 'ON ' if ($i > 1 or $i <= ($size_join - 1));
        $data .= join " = ", @$table_join;
      }
      
      $i++;
    }
  }
  return $data;
}

# For get column from where clause:
# ------------------------------------------------------------------------
sub getCol_from_where {
  my $self = shift;
  my ($data_where) = @_;
  my @result = ();
  
  if ($data_where =~ m/(and|or)/) {
    @result = split(/and|or/, $data_where);
    @result = grep {!/is|not/} @result;
    @result = grep {$_ = trim($_);
      $_ =~ s/\=.*//g;
      $_ = trim($_)} @result;
    my @temp1 = grep {!/^([A-Za-z\_0-9]+)\.([A-Za-z\_0-9]+)/} @result;
    my @temp2 = grep {$_ =~ s/^([A-Za-z\_0-9]+)\.([A-Za-z\_0-9]+)/$2/g} @result;
    @result = (@temp1, @temp2);
  }
  
  if ($data_where =~ m/(AND|OR)/) {
    @result = split(/AND|OR/, $data_where);
    @result = grep {!/IS|NOT/} @result;
    @result = grep {$_ = trim($_);
      $_ =~ s/\=.*//g;
      $_ = trim($_)} @result;
    my @temp1 = grep {!/^([A-Za-z\_0-9]+)\.([A-Za-z\_0-9]+)/} @result;
    my @temp2 = grep {$_ =~ s/^([A-Za-z\_0-9]+)\.([A-Za-z\_0-9]+)/$2/g} @result;
    @result = (@temp1, @temp2);
  }
  return @result;
}

# For get value column from where clause:
# ------------------------------------------------------------------------
sub getValue_from_where {
  my $self = shift;
  my ($data_where) = @_;
  my @result = ();
  
  if ($data_where =~ m/(and|or)/) {
    @result = split(/and|or/, $data_where);
    @result = grep {$_ = trim($_);
      $_ =~ s/(.*)=//g;
      $_ = trim($_)} @result;
    @result = grep {!/is|not/} @result;
  }
  if ($data_where =~ m/(AND|OR)/) {
    @result = split(/AND|OR/, $data_where);
    @result = grep {$_ = trim($_);
      $_ =~ s/(.*)=//g;
      $_ = trim($_)} @result;
    @result = grep {!/IS|NOT/} @result;
  }
  return @result;
}

# for where clause :
# ------------------------------------------------------------------------
sub for_where_old {
  my $self = shift;
  my ($options) = @_;
  my $data = '';
  
  my @list_col = @{$options->{'col'}};
  my @opr_where = @{$options->{'opr'}};
  my $size_col = scalar @list_col;
  my $size_opr = scalar @opr_where;
  
  my $i = 0;
  my $operator = '';
  while ($i < $size_opr) {
    if ($size_col < $size_opr) {
      last;
    }
    else {
      $operator = $self->sql_opr($opr_where[$i]);
      if ($i == 0) {
        if ($opr_where[$i] eq 'or') {
          $data .= '(' . $list_col[$i] . " $operator " . $list_col[($i + 1)] . ')';
        }
        elsif ($opr_where[($i + 1)] eq 'or') {
          $data .= $list_col[$i] . " $operator (" . $list_col[($i + 1)];
        }
        else {
          $data .= $list_col[$i] . " $operator " . $list_col[($i + 1)];
        }
      }
      else {
        if ($opr_where[$i] eq 'or') {
          $data .= " $operator " . $list_col[($i + 1)] . ')';
          $data .= ' ' if ($i == ($size_opr - 1));
          $data .= '' unless ($i == ($size_opr - 1));
        }
        elsif (exists $opr_where[($i - 1)] and $opr_where[($i - 1)] eq 'or') {
          if ($opr_where[$i] ne 'or') {
            $data .= " $operator " . $list_col[$i];
          }
          else {
            $data .= ") $operator " . $list_col[$i];
          }
        }
        else {
          $data .= " $operator " . $list_col[$i];
        }
      }
    }
    $i++;
  }
  return $data;
}

# For create clause query :
# ------------------------------------------------------------------------
sub create_clause {
  my ($self, $clause) = @_;
  my $data = '';
  if (exists $clause->{'where'}) {
    $data .= ' WHERE ' . $clause->{'where'};
  }
  if (exists $clause->{'orderby'} and not exists $clause->{'groupby'}) {
    $data .= ' ORDER BY ' . $clause->{'orderby'};
  }
  if (exists $clause->{'orderby'} and exists $clause->{'groupby'}) {
    $data .= ' GROUP BY ' . $clause->{'groupby'} . ' ORDER BY ' . $clause->{'orderby'};
  }
  if (exists $clause->{'order'}) {
    $data .= ' ' . (uc $clause->{'order'});
  }
  if (exists $clause->{'limit'}) {
    $data .= ' LIMIT ' . $clause->{'limit'};
  }
  return $data;
}

# For "column" with "value" :
# ------------------------------------------------------------------------
sub col_with_val {
  my $self = shift;
  my ($column, $value) = @_;
  
  my @data_col = @{$column};
  my @data_val = @{$value};
  
  my @data = map {$data_col[$_] . '=' . $data_val[$_]} keys @data_col;
  return @data;
}

# For Attribute validation :
# ------------------------------------------------------------------------
sub attr_val {
  my ($self, $attr) = @_;
  my $size_attr = scalar keys %{$attr};
  unless ($size_attr == 0) {
    if (exists $attr->{fetch_data} or exists $attr->{callback}) {
      return $attr;
    }
    else {
      return {};
    }
  }
  else {
    return $attr;
  }
}

# For Action Query :
# ------------------------------------------------------------------------
sub action_query {
  my $self = shift;
  my $action = {
    insert   => {
      '4' => sub {},
      '5' => sub {},
      '6' => sub {},
    },
    'update' => {},
    'delete' => {},
  };
  
  return {
    'insert'
  }
}

# For Default Action in Query :
# ------------------------------------------------------------------------
sub action_InQuery {
  my $self = shift;
  
  return {
    insert   => sub {
      my ($dbh, $sth) = @_;
      my %data = ();
      my $rv = $sth->rows;
      if ($rv >= 1) {
        my $new_id = $dbh->{mysql_insertid};
        $data{'result'} = 1;
        $data{'id'} = $new_id;
      }
      else {
        $data{'result'} = 0;
        $data{'data'} = error_sql->errdata($sth);
      }
      $sth->finish();
      #			$dbh->disconnect();
      return \%data;
    },
    'update' => sub {
      my ($dbh, $sth) = @_;
      my %data = ();
      my $rv = $sth->rows;
      if ($rv >= 1) {
        $data{'result'} = 1;
      }
      else {
        $data{'result'} = 0;
        $data{'data'} = error_sql->errdata($sth);
      }
      $sth->finish();
      #			$dbh->disconnect();
      return \%data;
    },
    'delete' => sub {
      my ($dbh, $sth) = @_;
      my %data = ();
      my $rv = $sth->rows;
      if ($rv >= 1) {
        $data{'result'} = 1;
      }
      else {
        $data{'result'} = 0;
        $data{'data'} = error_sql->errdata($sth);
      }
      $sth->finish();
      #			$dbh->disconnect();
      return \%data;
    },
    'select' => sub {
      my ($dbh, $sth) = @_;
      my %data = ();
      my $rv = $sth->rows;
      if ($rv >= 1) {
        my $r_data = $sth->fetchrow_arrayref();
        $data{'result'} = 1;
        $data{'data'} = $r_data;
      }
      else {
        $data{'result'} = 0;
        $data{'data'} = error_sql->errdata($sth);
      }
      $sth->finish();
      #			$dbh->disconnect();
      return \%data;
    }
  };
}

# for Type Join :
# ------------------------------------------------------------------------
sub type_join {
  my ($self, $type) = @_;
  #  my $size_param = scalar @_;
  #  print "In sub type_join = $size_param\n";
  #  print "In sub type_join size = $type\n";
  
  my %data_type = (
    'left'  => 'LEFT JOIN',
    'inner' => 'INNER JOIN',
  );
  return $data_type{$type} if exists $data_type{$type};
}

# For SQL Operator :
# ------------------------------------------------------------------------
sub sql_opr {
  my $self = shift;
  my ($opr) = @_;
  
  my %data_opr = (
    'and' => 'AND',
    'or'  => 'OR'
  );
  return $data_opr{$opr} if exists $data_opr{$opr};
}

# For get data prepare statement :
# ------------------------------------------------------------------------
sub insert_data_prepare_statement {
  my $self = shift;
  my ($data_col) = @_;
  
  #	print "From prepare_statement : \n";
  #	print Dumper $data_col;
  
  my %data = (
    'NOW()' => 1,
  );
  my @result = grep {$_ ne 'NOW()'} @{$data_col};
  return @result;
}

# For get data is not prepare statement :
# ------------------------------------------------------------------------
sub insert_data_no_prepare_statement {
  my $self = shift;
  my ($data_col) = @_;
  
  #	print "From no_prepare_statement : \n";
  #	print Dumper $data_col;
  
  my %data = (
    'NOW()' => 1,
  );
  
  return grep {$_ eq 'NOW()'} values @{$data_col};
}

# For replace data values "insert" :
# ------------------------------------------------------------------------
sub replace_data_value_insert {
  my $self = shift;
  my ($data_value) = @_;
  
  my @data = @{$data_value};
  my @pre_data = ();
  my @result = map {$pre_data[$_] => $data[$_] eq 'NOW()' ? 'NOW()' : '?'} keys @data;
  @result = grep (defined, @result);
  return @result;
}

1;