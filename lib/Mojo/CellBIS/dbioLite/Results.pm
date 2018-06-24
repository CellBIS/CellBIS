package # hide from PAUSE
  Mojo::CellBIS::dbioLite::Results;

use Mojo::Base -base;

use Carp ();
use Mojo::Util qw(dumper);
use Mojo::Loader qw(data_section find_modules load_class);

# ABSTRACT: Module for handle query database.

has 'dbio';
has [qw(check_table create_table table_info)];
has class_table => '';

sub table {
  my $self = shift;
  my $table = shift;
  
  say dumper $table;
  
  Carp::croak "table name is undefined"
    unless $table;
  
  my $table_class = $self->class_table() . '::' . $table;
  my $class = load_class $table_class;
  warn qq{Loading "$table" failed: $class} if ref $class;
  
  return $table_class->new(@_);
}

1;