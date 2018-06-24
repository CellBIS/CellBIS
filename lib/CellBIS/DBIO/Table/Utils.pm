package  # hide from PAUSE
CellBIS::DBIO::Table::Utils;

use strict;
use warnings FATAL => 'all';

use Data::Dumper;
use String::Util qw(trim);
use Hash::MultiValue;
use CellBIS::DateTime;
use Scalar::Util qw(blessed);



# For Foreign Key Validator:
# ------------------------------------------------------------------------
sub fk_validator {
  my ($table_attr, $col_attr) = @_;
  my %fk_attr = (
    name         => 0,
    col_name     => 0,
    table_target => 0,
    col_target   => 0,
  );
  
  my $fk = $table_attr->{fk};
  if (exists $fk->{name}) {
    unless ($fk->{name} eq '') {
      $fk_attr{name} = 1;
    }
  }
  if (exists $fk->{col_name}) {
    unless ($fk->{col_name} eq '') {
      $fk_attr{col_name} = 1;
    }
  }
  
  if (exists $fk->{table_target}) {
    unless ($fk->{table_target} eq '') {
      $fk_attr{table_target} = 1;
    }
  }
  
  if (exists $fk->{col_target}) {
    unless ($fk->{col_target} eq '') {
      $fk_attr{col_target} = 1;
    }
  }
  my @r_val = grep {!$_} values %fk_attr;
  my $size_result = scalar @r_val;
  
  if ($size_result >= 1) {
    my $new_TableAttr = Hash::MultiValue->new(%{$table_attr});
    $new_TableAttr->remove('fk');
    $table_attr = $new_TableAttr->as_hashref;
  }
  else {
    unless (exists $col_attr->{$fk->{col_name}}) {
      my $new_TableAttr = Hash::MultiValue->new(%{$table_attr});
      $new_TableAttr->remove('fk');
      $table_attr = $new_TableAttr->as_hashref;
    }
  }
  return $table_attr;
}

# For Foreign key attribute :
# ------------------------------------------------------------------------
sub fk_attr_validator {
  my ($fk_table) = @_;
  my $data = '';
  my %ondelup = (
    'cascade' => 'CASCADE',
    'null'    => 'SET NULL',
    'default' => 'SET DEFAULT'
  );
  my %data_fk = (
    'ondel' => 0,
  );
  if (exists $fk_table->{ondelete}) {
    if (exists $ondelup{(lc $fk_table->{ondelete})}) {
      $data_fk{'ondel'} = 1;
      $data .= 'ON DELETE ' . $ondelup{(lc $fk_table->{ondelete})};
    }
  }
  
  if (exists $fk_table->{onupdate}) {
    if (exists $ondelup{(lc $fk_table->{onupdate})}) {
      $data .= ' ' if $data_fk{'ondel'} == 1;
      $data .= 'ON UPDATE ' . $ondelup{(lc $fk_table->{onupdate})};
    }
  }
  $data = trim($data);
  return $data;
}

# For Table Attribute Validator :
# ------------------------------------------------------------------------
sub table_attr_val {
  my $self = shift;
  my ($col_attr, $table_attr) = @_;
  my $new_tblAttr = {};
  my $attrib_table = '';
  
  if (exists $table_attr->{fk}) {
    $table_attr = fk_validator($table_attr, $col_attr);
    my $table_fk = '';
    if (exists $table_attr->{fk}) {
      my $fk_table = $table_attr->{fk};
      my $fk_name = $fk_table->{name};
      my $col_name = $fk_table->{col_name};
      my $table_target = $fk_table->{table_target};
      my $col_target = $fk_table->{col_target};
      my $fk_attr = '';
      if ($fk_table->{attr}) {
        $fk_attr = fk_attr_validator($fk_table->{attr});
      }
      $table_fk .= "\tKEY " . $fk_name . " ($col_name), \n";
      $table_fk .= "\tCONSTRAINT $fk_name ";
      $table_fk .= "FOREIGN KEY ($col_name) ";
      $table_fk .= "REFERENCES $table_target ($col_target)\n" if $fk_attr eq '';
      $table_fk .= "REFERENCES $table_target ($col_target) \n\t$fk_attr\n" unless $fk_attr eq '';
      
      my $new_attrTbl = Hash::MultiValue->new(%{$table_attr});
      $new_attrTbl->set(fk => $table_fk);
      $table_attr = $new_attrTbl->as_hashref;
    }
  }
  if (exists $table_attr->{index}) {
    if (ref($table_attr->{index}) eq "ARRAY" and (scalar @{$table_attr->{index}}) > 0) {
      my $table_index = join ',', @{$table_attr->{index}};
      $table_index = 'INDEX (' . $table_index . ')';
      my $new_attrTbl = Hash::MultiValue->new(%{$table_attr});
      $new_attrTbl->set(index => $table_index);
      $table_attr = $new_attrTbl->as_hashref;
    }
  }
  my %tbl_attr = (
    engine => 0,
  );
  if (exists $table_attr->{engine}) {
    $tbl_attr{engine} = 1;
    my $r_engine = check_engine($table_attr->{engine});
    $attrib_table .= 'ENGINE=' . $r_engine;
  }
  if (exists $table_attr->{charset}) {
    $attrib_table .= ' ' if ($tbl_attr{engine} == 1);
    my $r_charset = check_charset($table_attr->{charset});
    $attrib_table .= 'DEFAULT CHARSET=' . $r_charset;
  }
  $new_tblAttr = Hash::MultiValue->new(%{$table_attr});
  $new_tblAttr->set(attr => $attrib_table);
  $table_attr = $new_tblAttr->as_hashref;
  
  return $table_attr;
}

# For Column Attribute validator :
# ------------------------------------------------------------------------
sub table_col_attr_val {
  my $self = shift;
  my ($col_list, $col_attr) = @_;
  
  #  print Dumper $col_list;
  #  print Dumper $col_attr;
  if (ref($col_attr) eq "HASH") {
    my $i = 0;
    my $until = scalar @{$col_list};
    my @pk_list = ();
    my @ai_list = ();
    my $size_pk = 0;
    my $size_ai = 0;
    my $col_name = '';
    my $curr_colAttr = {};
    my $new_colAttr = Hash::MultiValue->new(%{$col_attr});
    # print Dumper \@_;
    while ($i < $until) {
      $col_name = $col_attr->{$col_list->[$i]};
      if (exists $col_name->{'is_autoincre'}) {
        $size_ai = ($size_ai + 1);
        push @ai_list, $col_list->[$i];
        $curr_colAttr = Hash::MultiValue->new(%{$col_name});
        $curr_colAttr->remove('is_autoincre');
        
        $new_colAttr->set($col_list->[$i] => $curr_colAttr->as_hashref);
      }
      $i++;
    }
    $col_attr = $new_colAttr->as_hashref;
    
    $i = 0;
    while ($i < $until) {
      $col_name = $col_attr->{$col_list->[$i]};
      if (exists $col_name->{'is_primarykey'}) {
        $size_pk = ($size_pk + 1);
        push @pk_list, $col_list->[$i];
        $curr_colAttr = Hash::MultiValue->new(%{$col_name});
        $curr_colAttr->remove('is_primarykey');
        
        $new_colAttr->set($col_list->[$i] => $curr_colAttr->as_hashref);
      }
      $i++;
    }
    
    if ($size_pk >= 1) {
      my $r_colAttr = $new_colAttr->as_hashref;
      my $pk_table = $r_colAttr->{$pk_list[0]};
      
      $curr_colAttr = Hash::MultiValue->new(%{$pk_table});
      $curr_colAttr->set('is_primarykey' => 1);
      
      $col_attr = Hash::MultiValue->new(%{$r_colAttr});
      $col_attr->set($pk_list[0] => $curr_colAttr->as_hashref);
      $col_attr = $col_attr->as_hashref;
    }
    
    if ($size_ai >= 1) {
      my $pk_table = $col_attr->{$pk_list[0]};
      
      $curr_colAttr = Hash::MultiValue->new(%{$pk_table});
      $curr_colAttr->set('is_autoincre' => 1);
      
      $col_attr = Hash::MultiValue->new(%{$col_attr});
      $col_attr->set($pk_list[0] => $curr_colAttr->as_hashref);
      $col_attr = $col_attr->as_hashref;
    }
    
    $i = 0;
    $new_colAttr = Hash::MultiValue->new();
    while ($i < $until) {
      $col_name = $col_attr->{$col_list->[$i]};
      
      $new_colAttr->add($col_list->[$i] => $col_name);
      $i++;
    }
    $col_attr = $new_colAttr->as_hashref;
  }
  return $col_attr;
}

# For Default field table :
# ------------------------------------------------------------------------
sub default_field_tbl_val {
  my ($type, $attr) = @_;
  my $data = '';
  if ($type eq 'datetime') {
    if ($attr == 1) {
      $data = "CURRENT_TIMESTAMP";
    }
    if ($attr eq 'yes') {
      $data = "CURRENT_TIMESTAMP";
    }
  }
  return $data;
}

# For Create Column Attr :
# ------------------------------------------------------------------------
sub create_colAttr {
  my $self = shift;
  my ($col_name, $attr, $db_type) = @_;
  my $data = $col_name . ' ';
  
  if (exists $attr->{type}) {
    $data .= (uc $attr->{type}->{name}) . '' if (exists $attr->{type}->{name});
    $data .= 'col1' unless (exists $attr->{type}->{name});
    
    $data .= '(' . $attr->{type}->{size} . ') ' if (exists $attr->{type}->{size});
    $data .= ' ' unless (exists $attr->{type}->{size});
  }
  
  unless (exists $attr->{custom}) {
    if (exists $attr->{default} and $attr->{default} ne '') {
      if (exists $attr->{onupdate} and $attr->{onupdate} ne '') {
        my $field_default_val = default_field_tbl_val($attr->{type}->{name}, $attr->{onupdate});
        $data .= "ON UPDATE $field_default_val ";
      }
      else {
        $data .= "DEFAULT $attr->{default} ";
      }
    }
    
    if (exists $attr->{onupdate} and $attr->{onupdate} ne '') {
      my $field_default_val = default_field_tbl_val($attr->{type}->{name}, $attr->{onupdate});
      $data .= "ON UPDATE $field_default_val ";
    }
    
    if (exists $attr->{is_null}) {
      $data .= 'NOT NULL ' if $attr->{is_null} eq 0;
      $data .= 'NULL ' if $attr->{is_null} eq 1;
    }
    else {
      $data .= 'NOT NULL ';
    }
    
    if (exists $attr->{is_primarykey} and $attr->{is_primarykey} == 1) {
      $data .= 'PRIMARY KEY ';
    }
    
    if (exists $attr->{is_autoincre} and $attr->{is_autoincre} == 1) {
      if ($db_type eq 'sqlite') {
        $data .= 'AUTOINCREMENT ';
      }
      else {
        $data .= 'AUTO_INCREMENT ';
      }
    }
  }
  else {
    $data .= $attr->{custom};
  }
  $data = trim($data);
  $data = "\t$data";
  return $data;
}

# For create query table :
# ------------------------------------------------------------------------
sub create_queryTbl {
  my $self = shift;
  my $arg_len = scalar @_;
  my $data = '';
  
  my $table_name = $_[0];
  my $col_list = $_[1];
  my $col_attr = $_[2];
  my $table_attr = {};
  my $connector = {};
  my $size_tblAtr = 0;
  my $db_type = '';
  
  if (defined $_[4]) {
    if (ref($_[3]) eq "HASH") {
      $table_attr = $_[3];
      $size_tblAtr = scalar keys %{$table_attr};
    }
    $connector = $_[4];
  }
  else {
    if (ref($_[3]) eq "HASH") {
      if (exists $_[3]->{db_type}) {
        $connector = $_[3];
      }
      else {
        $table_attr = $_[3];
        $size_tblAtr = scalar keys %{$table_attr};
      }
    }
  }
  
  $col_attr = $self->table_col_attr_val($col_list, $col_attr);
  $table_attr = $self->table_attr_val($col_attr, $table_attr);
  $db_type = $connector->{db_type} if ref($connector) eq "HASH" and exists $connector->{db_type};
  
  my $size_col = scalar @{$col_list};
  my $i = 0;
  my @list_col = ();
  while ($i < $size_col) {
    if ($db_type ne '') {
      push @list_col, $self->create_colAttr($col_list->[$i], $col_attr->{$col_list->[$i]}, $db_type);
    }
    else {
      push @list_col, $self->create_colAttr($col_list->[$i], $col_attr->{$col_list->[$i]}, 'mysql');
    }
    $i++;
  }
  my $list_column = join ",\n", @list_col;
  my $fk_table = '';
  my $index_table = '';
  my $attr_table = '';
  
  $data .= "CREATE TABLE IF NOT EXISTS $table_name(\n";
  
  unless ($size_tblAtr == 0) {
    $data .= "$list_column";
    my $size_fk = 0;
    if (exists $table_attr->{fk}) {
      $size_fk = 1;
      $fk_table = $table_attr->{fk};
      $data .= ",\n$fk_table";
    }
    if (exists $table_attr->{index}) {
      $index_table = $table_attr->{index};
      $data .= ",\n$index_table";
    }
    if (exists $table_attr->{attr} and $table_attr->{attr} ne '') {
      if ($size_fk == 1) {
        $attr_table = $table_attr->{attr};
        $data .= ") $attr_table";
      }
      else {
        if ($db_type eq 'sqlite') {
          $data .= ")";
        }
        else {
          $data .= ") ENGINE=InnoDB DEFAULT CHARSET=utf8";
        }
      }
    }
    else {
      if ($db_type eq 'sqlite') {
        $data .= ")";
      }
      else {
        $data .= ") ENGINE=InnoDB DEFAULT CHARSET=utf8";
      }
    }
    
  }
  else {
    $data .= "$list_column\n";
    if ($db_type eq 'sqlite') {
      $data .= ")";
    }
    else {
      $data .= ") ENGINE=InnoDB DEFAULT CHARSET=utf8";
    }
  }
  # print Dumper $data;
  return $data;
}

#######################################################################################
# FOR EVENT SCHEDULER
#######################################################################################

# For recurring event scheduler validation :
# ------------------------------------------------------------------------
sub event_type_recurr_val {
  my ($event_attr) = @_;
  my $result = 0;
  my %data_val = (
    'time'  => 0,
    'start' => 0,
  );
  
  $data_val{time} = 1 if (exists $event_attr->{time});
  $data_val{start} = 1 if (exists $event_attr->{start});
  
  my @r_val = grep {!$_} values %data_val;
  my $size_result = scalar @r_val;
  
  unless ($size_result >= 1) {
    $result = 1;
  }
  return $result;
}

# For event attribute validation :
# ------------------------------------------------------------------------
sub event_attr_val {
  my $self = shift;
  my ($event_attr) = @_;
  my %data = ('result' => 2);
  
  my %data_type = (
    'one'       => 'one',
    'one_nsave' => 'one_nsave',
    'recurr'    => 'recurr',
  );
  
  my %data_action = (
    'one'       => 'create_event_one',
    'one_nsave' => 'create_event_one_nodel',
    'recurr'    => 'create_event_recurr'
  );
  
  if (exists $event_attr->{type}) {
    my $type = 'one';
    if (exists $data_type{$event_attr->{type}}) {
      $type = $data_type{$event_attr->{type}};
    }
    
    if ($type eq 'one') {
      if (exists $event_attr->{time}) {
        $data{'result'} = 1;
        $data{'subr'} = $data_action{'one'};
      }
    }
    
    if ($type eq 'one_nsave') {
      if (exists $event_attr->{time}) {
        $data{'result'} = 1;
        $data{'subr'} = $data_action{'one_nsave'};
      }
    }
    
    if ($type eq 'recurr') {
      my $r_next_val = event_type_recurr_val($event_attr);
      if ($r_next_val) {
        $data{'result'} = 1;
        $data{'subr'} = $data_action{'recurr'};
      }
    }
  }
  return \%data;
}

# For event function parameter validation :
# ------------------------------------------------------------------------
sub event_param_val {
  my $self = shift;
  my $arg_len = scalar @_;
  my %data = ('result' => 2);
  
  my %data_arg = (
    dbh        => 0,
    event_name => 0,
    event_attr => 0,
    sql_event  => 0
  );
  
  unless ($arg_len < 4) {
    my $dbh = $_[0];
    my $event_name = $_[1];
    my $event_attr = $_[2];
    my $sql_event = $_[3];
    
    if (blessed($dbh)) {
      $data_arg{dbh} = 1;
    }
    if (ref($event_name) eq "" and $event_name ne '') {
      $data_arg{event_name} = 1;
    }
    if (ref($event_attr) eq "HASH") {
      $data_arg{event_attr} = 1;
    }
    if (ref($sql_event) eq "" and $sql_event ne '') {
      $data_arg{sql_event} = 1;
    }
    
    my @r_val = grep {!$_} values %data_arg;
    my $size_result = scalar @r_val;
    
    unless ($size_result >= 1) {
      $data{'result'} = 1;
    }
  }
  return \%data;
}

# Check time event mysql :
# ------------------------------------------------------------------------
sub check_event_time {
  my $self = shift;
  my ($type, $time_event) = @_;
  my $data = '';
  
  if ($type eq 'every') {
    $data = 'EVERY 10 MINUTE';
    unless ($time_event eq '0') {
      my $getTime_event = event_time_sql($time_event);
      $data = 'EVERY ' . $getTime_event->{event};
    }
  }
  else {
    unless ($time_event eq '0') {
      $time_event = $time_event if ($time_event =~ m/^[\+\-]/);
      $time_event = '+' . $time_event unless ($time_event =~ m/^[\+\-]/);
      my $getTime_event = event_time_sql($time_event);
      $data = 'CURRENT_TIMESTAMP + INTERVAL ' . $getTime_event->{event};
    }
    else {
      $data = 'CURRENT_TIMESTAMP';
    }
  }
  return $data;
}

# For check type event :
# ------------------------------------------------------------------------
sub check_type_event {
  my $self = shift;
  my ($type) = @_;
  
  my %data_type = (
    'one'       => 'one',
    'one_nsave' => 'one_nsave',
    'recurr'    => 'recurr'
  );
  
  return 'one' unless exists $data_type{$type};
  return $data_type{$type} if exists $data_type{$type};
}

# For event time sql:
# ------------------------------------------------------------------------
sub event_time_sql {
  my ($time) = @_;
  my %data = ();
  
  #	warn "Time Event Input : $time";
  
  my $operator = '';
  my $num_time = '';
  my $identifier = '';
  if ($time =~ m/^([\+|\-])([0-9]+)([A-Za-z]+)/) {
    $operator = "$1";
    $num_time = "$2";
    $identifier = "$3";
  }
  #	warn "Time Event Before : $operator - $num_time - $identifier";
  
  $operator = $operator unless $operator eq '';
  $operator = '+' if $operator eq '';
  $num_time = $num_time unless $num_time eq '';
  $num_time = 10 if $num_time eq '';
  $identifier = $identifier unless $identifier eq '';
  $identifier = 'm' if $identifier eq '';
  
  #	warn "Time Event : $operator - $num_time - $identifier";
  
  my $unit_time = abbr_unitTime($identifier);
  
  $data{'event'} = "$num_time $unit_time";
  $data{'time'} = $num_time;
  $data{'unit'} = $unit_time;
  return \%data;
}

#######################################################################################
# FOR TRIGGER
#######################################################################################

# For trigger attribute validation :
# ------------------------------------------------------------------------
sub trigger_attr_val {
  my $self = shift;
  my ($trigger_attr) = @_;
  my %data = ('result' => 2);
  
  my %attr = (
    type   => 0,
    action => 0,
  );
  
  my %type_attr = (
    'before' => 1,
    'after'  => 1,
  );
  
  my %action_attr = (
    'insert' => 1,
    'update' => 1,
    'delete' => 1
  );
  
  if (exists $trigger_attr->{type}) {
    if (exists $type_attr{$trigger_attr->{type}}) {
      $attr{type} = 1;
    }
  }
  if (exists $trigger_attr->{action}) {
    if (exists $action_attr{$trigger_attr->{action}}) {
      $attr{action} = 1;
    }
  }
  my @r_val = grep {!$_} values %attr;
  my $size_result = scalar @r_val;
  
  $data{'result'} = 1 unless ($size_result >= 1);
  return \%data;
}

# For Trigger arg validation :
# ------------------------------------------------------------------------
sub trigger_arg_val {
  my $self = shift;
  my $arg_len = scalar @_;
  my %data = ('result' => 1);
  
  my %data_arg = (
    dbh          => 0,
    table_name   => 0,
    trigger_name => 0,
    trigger_attr => 0,
    sql_query    => 0,
    callback     => 0
  );
  
  if ($arg_len == 5) {
    $data_arg{dbh} = 1 if (blessed($_[0]));
    $data_arg{table_name} = 1 if (ref($_[1]) eq "" and $_[1] ne '');
    $data_arg{trigger_name} = 1 if (ref($_[2]) eq "" and $_[1] ne '');
    $data_arg{trigger_attr} = 1 if (ref($_[3]) eq "HASH");
    $data_arg{sql_query} = 1 if (ref($_[4]) eq "" and $_[3] ne '');
    delete $data_arg{callback};
    $data{'arg'} = 5;
    #    print "ARG == 5\n";
  }
  if ($arg_len >= 6) {
    $data_arg{dbh} = 1 if (blessed($_[0]));
    $data_arg{table_name} = 1 if (ref($_[1]) eq "" and $_[1] ne '');
    $data_arg{trigger_name} = 1 if (ref($_[2]) eq "" and $_[1] ne '');
    $data_arg{trigger_attr} = 1 if (ref($_[3]) eq "HASH");
    $data_arg{sql_query} = 1 if (ref($_[4]) eq "" and $_[3] ne '');
    $data_arg{callback} = 1 if (ref($_[5]) eq "CODE");
    $data{'arg'} = 6;
  }
  #  print Dumper \%data_arg;
  
  my @r_val = grep {!$_} values %data_arg;
  my $size_result = scalar @r_val;
  
  if ($size_result >= 1) {
    $data{'result'} = 2;
  }
  return \%data;
}

#######################################################################################
# FOR Helper
#######################################################################################

# For check engine :
# ------------------------------------------------------------------------
sub check_engine {
  my ($engine) = @_;
  $engine = lc $engine;
  my %list_engine = (
    'myisam' => 'MyISAM',
    'innodb' => 'InnoDB',
  );
  
  if (exists $list_engine{$engine}) {
    return $list_engine{$engine};
  }
  else {
    return $list_engine{'innodb'};
  }
}

# For check charset :
# ------------------------------------------------------------------------
sub check_charset {
  my ($charset) = @_;
  $charset = lc $charset;
  my %list_charset = (
    'utf8'   => 'utf8',
    'latin1' => 'latin1',
  );
  if (exists $list_charset{$charset}) {
    return $list_charset{$charset};
  }
  else {
    return $list_charset{'utf8'};
  }
}

# For Check Collate :
# ------------------------------------------------------------------------
sub check_collate {
  my ($collate) = @_;
  $collate = lc $collate;
  my %list_collate = {};
}

# for abbreviation measurement time :
# ------------------------------------------------------------------------
sub abbr_unitTime {
  my ($time) = @_;
  
  my %data = (
    'Y' => 'YEAR',
    'M' => 'MONTH',
    'W' => 'WEEK',
    'D' => 'DAY',
    's' => 'SECOND',
    'm' => 'MINUTE',
    'h' => 'HOUR',
  );
  
  return $data{'m'} unless exists $data{$time};
  return $data{$time} if exists $data{$time};
}


1;