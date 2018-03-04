package # hide from PAUSE
  Mojo::CellBIS::dbioLite::Table;

use Mojo::Base -base;

use Exporter 'import';
use Scalar::Util qw(blessed);
use Carp ();

use Hash::MultiValue;

# ABSTRACT: Table
our $VERSION = '0.1000';

# Plan Restore and Backup data in Table.
has [qw(restore backup)];

# For Table Schema to place pattern column table
has table_schema => sub { { table_name => '' } };

# For Table Information
has table_info => sub { my $self = shift; return $self->table_schema };

# For name of column
has name => sub { {} };

# For alias name of column
has alias => sub { {} };

# For add column
sub add_col {
  my $self = shift;
  my ($key, $value);
  ($key, $value) = @_ if @_ == 2;
  
  if (@_ > 2) {
    $key = shift;
    $value = shift;
  }
  
  my $new_column = Hash::MultiValue->new( %{$self->table_schema()} );
  $new_column->add($_[0] => $_[1]);
  $self->{table_schema} = $new_column->as_hashref;
};

# For Check Table :
has check_table => sub {
  my $self = shift;
  my $arg_len = scalar @_;
  my $dbio;
  my $get_tableinfo;
  my $table;
  
  if (blessed($self)) {
    if (exists $self->{dbio}) {
      $dbio = $self->{dbio};
    }
    else {
      ($dbio) = @_;
    }
    $get_tableinfo = $self->table_info();
    
    $table = $dbio->table();
    return $table->check($get_tableinfo->{table_name});
  }
  else {
    if ($arg_len == 1) {
      ($dbio) = @_;
      $get_tableinfo = $self->table_info();
      $table = $dbio->table();
      return $table->check($get_tableinfo->{table_name});
    }
    if ($arg_len >= 2) {
      ($dbio, $get_tableinfo) = @_;
      
      $table = $dbio->table();
      return $table->check($get_tableinfo->{table_name});
    }
  }
};

# For Create Table :
has create_table => sub { return { result => 103 } };

1;
