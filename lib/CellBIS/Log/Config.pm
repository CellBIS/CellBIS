package CellBIS::Log::Config;
use Mojo::Base '-strict';

use Mojo::Util qw(dumper);

# ABSTRACT: Module for handle log configure.
our $VERSION = '0.1000';

# Config for database log :
# ------------------------------------------------------------------------
sub db_log {
  my $self = shift;
  my ($logname, $db_name, $table_name, $table_field, $table_value, $params) = @_;
  
  my @for_paramInsert = map {"log4perl.appender.$logname.params." . $_} @{$params};
  my $paramInsert = join " \n", @for_paramInsert;
  #  say "result param : ";
  #  say dumper @for_paramInsert;
  #  $paramInsert = join " \n", @{$paramInsert};
  #  say "Params : \n $paramInsert";
  return qq{
     log4perl.category = INFO, $logname
     log4perl.appender.$logname                   = Log::Log4perl::Appender::DBI
     log4perl.appender.$logname.datasource        = DBI:SQLite:dbname=$db_name
     log4perl.appender.$logname.sql               = insert into $table_name($table_field) values($table_value)
     $paramInsert

     log4perl.appender.$logname.usePreparedStmt   = 1

     #just pass through the array of message items in the log statement
     log4perl.appender.$logname.layout            = Log::Log4perl::Layout::NoopLayout
     log4perl.appender.$logname.warp_message       = 0

     #driver attributes support
     log4perl.appender.$logname.attrs.f_encoding   = utf8
    };
}

# Config for file log :
# ------------------------------------------------------------------------
sub file_log {
  my $self = shift;
  my ($config_name, $filename, $format) = @_;
  
  return qq{
    log4perl.rootLogger = INFO, $config_name
    log4perl.appender.$config_name = Log::Log4perl::Appender::File
    log4perl.appender.$config_name.filename = $filename
    log4perl.appender.$config_name.mode = append
    log4perl.appender.$config_name.layout = Log::Log4perl::Layout::PatternLayout
    log4perl.appender.$config_name.layout.ConversionPattern = $format
  };
}

1;