package  # hide from PAUSE
CellBIS::DBIO::Error;

use strict;
use warnings FATAL => 'all';

# ABSTRACT : Part of DBIO to handling error database.

# For Error Connenction MySQL :
# ------------------------------------------------------------------------
sub errconn {
  my $self = shift;
  my @data = ();
  
  if (defined $DBI::err) {
    $data[0] = $DBI::err;
  }
  else {
    $data[0] = 00000;
  }
  
  if (defined $DBI::state) {
    $data[1] = $DBI::state;
  }
  else {
    $data[1] = 0;
  }
  
  if (defined $DBI::errstr) {
    $data[2] = $DBI::errstr;
  }
  else {
    $data[2] = 'none';
  }
  
  return \@data;
}

# For Error Data Query MySQL :
# ------------------------------------------------------------------------
sub errdata {
  my ($self, $sth) = @_;
  my @data = ();
  
  $data[0] = $sth->err;
  $data[1] = $sth->state;
  $data[2] = $sth->errstr;
  
  return \@data;
}

1;