package Mojolicious::Plugin::CellbisDBIO;
$Mojolicious::Plugin::CellbisDBIO::VERSION = '0.1';
use Mojo::Base 'Mojolicious::Plugin';

use CellBIS::DBIO::Lite;
use DBIx::Connector;

# ABSTRACT: CellBIS Toolkit for Simple DBI Object based on Mojolicious Plugin.

has DBIOLite => sub {DBIx::Connector->new(@_)};

sub register {
  my ($self, $app, $config) = @_;
  my $size_cfg = scalar keys %{$config};
  
  $app->helper(dbioLite => sub {
      my $mojo = shift;
      my $arg_len = @_;
      if ($arg_len == 0) {
        # my $dbh = _dbHandler($self, $config);
        return CellBIS::DBIO::Lite->new($config);
      }
      if ($arg_len >= 1) {
        if (ref($_[0]) eq "HASH") {
          # my $dbh = _dbHandler($self, $_[0]);
          return CellBIS::DBIO::Lite->new($_[0]);
        }
      }
    });
  
  $app->helper(dbioLite_config => sub {return $size_cfg > 1 ? $config : {}});
}

1;
