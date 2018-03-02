#!/usr/bin/env perl
use Mojolicious::Lite;

plugin 'CellbisDBIO' => {
    'db_config' => {
      'db_name' => 'example.db',
      'db_host' => '',
      'db_user' => '',
      'db_pass' => '',
    },
    'db_type'   => 'sqlite',
    'error_dbi' => {}
};

get '/' => sub {
  my $c = shift;
  $c->render(template => 'index');
};

post '/create-table' => sub {
    my $c = shift;
    
    # Define scalar :
    my $r_table = 0;
    
    # DBIO Lite Initialization :
    my $dbio = $c->dbioLite();
    
    # For create tables
    my $table = $dbio->table();
    my $create_table = $table->create(
      'app_table',
      [
        'id',
        'firstname',
        'lastname'
      ],
      {
        'id' => {
          type          => { name => 'integer' },
          is_autoincre  => 1,
          is_primarykey => 1,
        },
        'firstname'   => {
          type => { name => 'varchar' => size => 50 }
        },
        'lastname'   => {
          type => { name => 'varchar' => size => 200 }
        },
      },
      {
        charset => 'utf8',
        engine  => 'innodb'
      }
    );
    
    if ($create_table->{result} == 1) {
      $r_table = 1;
    }
    
    $c->flash('result' => $r_table, 'table_name' => 'app_table');
    $c->redirect_to('index');
  };

app->start;
