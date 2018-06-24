package # hide from PAUSE
  Mojo::CellBIS::dbioLite::Schema;

use Mojo::Base -base;

use Exporter 'import';
use Scalar::Util qw(blessed);
use Carp ();

# ABSTRACT: Module for handle Database Schema.

has [qw(check_table create_table table_info)];

has [qw(table_class query_class)] => sub { '' };
has [qw(table_list query_list)] => sub { [] };

has configure => sub {
  my $self = shift;
  return {
    'parent'  => $self->table_class(),
    'table'      => $self->table_list,
    'table-temp' => []
  }
};

has configure_dbquery => sub {
  my $self = shift;
  return {
    'parent' => $self->query_class(),
    'query'  => $self->query_list,
  }
};

1;