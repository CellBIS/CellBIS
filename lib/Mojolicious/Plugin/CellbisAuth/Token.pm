package Mojolicious::Plugin::CellbisAuth::Token;
use Mojo::Base 'Mojolicious::Plugin';

use Mojo::Util qw(dumper);
use CellBIS::Auth::Store::Token;
use CellBIS::Auth::Token::Utils;
use CellBIS::DateTime;
use Mojo::JSON 'j';

our $VERSION = '0.1000';

# Register Plugin :
# ------------------------------------------------------------------------
sub register {
  my $plugin = shift;
  my $arg_len = scalar @_;
  my $app = $_[0];
  my $config = {};
  my $size_config = 0;
  my $dbio;
  
  if ($arg_len == 3) {
    if (ref($_[1]) eq "HASH") {
      $config = $_[1];
      $size_config = scalar keys %{$config};
    }
  }
  if ($size_config != 0) {
    $dbio = $app->dbioLite($config);
  }
  else {
    $dbio = $app->dbioLite();
  }
  my $store = CellBIS::Auth::Store::Token->new($app->dbioLite());
  
  $app->helper(cbtoken_update => sub {
      my $mojo = shift;
      my $cfg_token = '';
      $mojo->app->log->error('[1401] token config not found in helper "cbtoken_create" - "Mojolicious::Plugin::CellbisAuth::Token"')
        unless ref($_[0]) eq "HASH";
      if (ref($_[0]) eq "HASH") {
        $cfg_token = $_[0];
        
        # say "UpdateToken";
        my $name_token = 'undefined';
        my $timezone = 'Asia/Makassar';
        my $time_expire = '+3h';
        my $datetime_attr = '';
        $name_token = $cfg_token->{name} if exists $cfg_token->{name};
        $timezone = $cfg_token->{timezone} if (exists $cfg_token->{timezone});
        $time_expire = $cfg_token->{time_expire} if (exists $cfg_token->{time_expire});
        $datetime_attr = $cfg_token->{dt_attr} if (exists $cfg_token->{dt_attr} and ref($cfg_token->{dt_attr}) eq "HASH");
        
        my %data = ('result' => 2);
        my $check_table = '';
        my $create_table = '';
        
        my $table_info = $store->table_info();
        my $get_last_id = $store->get_last_id();
        $get_last_id = $get_last_id->{data};
        $check_table = $store->check_table();
        my $create_newToken = '';
        
        my $cooName = $mojo->cbcfg_token_name();
        
        my $get_tokenCoo = '';
        if ($mojo->cookie($cooName)) {
          $get_tokenCoo = $mojo->cookie($cooName);
          my $tokenVal_fUpdate = _validation_for_update($mojo, $store, $get_tokenCoo);
          if ($tokenVal_fUpdate->{result} != 2) {
            # warn j($tokenVal_fUpdate);
            # Regenerate Token Akses :
            $get_tokenCoo = $mojo->cookie($cooName);
            my $check_token = _validation_token($mojo, $store, $get_tokenCoo);
            unless ($check_token->{result} == 1) {
              # say "Cookies sedang dibuat";
              $create_newToken = _create_token($mojo, $store, $name_token, $timezone, $time_expire, $datetime_attr,
                $get_last_id);
              if ($create_newToken->{result} == 1) {
                my $token_coo = $create_newToken->{data}->{'token-coo'};
                # say "Name : $cooName";
                # say "Token Cookies : $token_coo";
                CellBIS::Auth::Token::Utils->_cookies_token($mojo, $token_coo, $time_expire);
              }
              
              # Place data :
              $data{'result'} = 1;
              $data{'data'} = $create_newToken->{data} if $create_newToken->{result} == 1;
              $data{'data'} = '' if exists $create_newToken->{result} == 0;
            }
          }
          else {
            # Create Table Token and Regenerate Token Akses :
            $create_table = $store->create_table();
            if ($create_table->{result} == 1) {
              $create_newToken = _create_token($mojo, $store, $name_token, $timezone, $time_expire, $datetime_attr,
                $get_last_id);
              if ($create_newToken->{result} == 1) {
                my $token_coo = $create_newToken->{data}->{'token-coo'};
                # say "Name : $cooName";
                # say "Token Cookies : $token_coo";
                CellBIS::Auth::Token::Utils->_cookies_token($mojo, $token_coo, $time_expire);
              }
              
              # Place data :
              $data{'result'} = 1;
              $data{'data'} = $create_newToken->{result} == 1 ? $create_newToken->{data} : '';
            }
            $mojo->app->log->error('[1501] Can\'t create table.') if ($create_table->{result} == 0);
          }
        }
        return \%data;
      }
      else {
        $mojo->app->log->error("Cannot create token");
      }
    });
  
  $app->helper(cbtoken_create => sub {
      my $mojo = shift;
      my $cfg_token = '';
      $mojo->app->log->error('[1401] token config not found in helper "cbtoken_create" - "Mojolicious::Plugin::CellbisAuth::Token"')
        unless ref($_[0]) eq "HASH";
      if (ref($_[0]) eq "HASH") {
        $cfg_token = $_[0];
        
        # say "CreateToken";
        my $name_token = 'undefined';
        my $timezone = 'Asia/Makassar';
        my $time_expire = '+3h';
        my $datetime_attr = '';
        $name_token = $cfg_token->{name} if exists $cfg_token->{name};
        $timezone = $cfg_token->{timezone} if (exists $cfg_token->{timezone});
        $time_expire = $cfg_token->{time_expire} if (exists $cfg_token->{time_expire});
        $datetime_attr = $cfg_token->{dt_attr} if (exists $cfg_token->{dt_attr} and ref($cfg_token->{dt_attr}) eq "HASH");
        
        my %data = ('result' => 2);
        my $check_table = '';
        my $create_table = '';
        
        my $table_info = $store->table_info();
        my $get_last_id = $store->get_last_id();
        $get_last_id = $get_last_id->{data};
        $check_table = $store->check_table();
        my $create_newToken = '';
        
        my $cooName = $mojo->cbcfg_token_name();
        
        # IF Cookies is not exists :
        unless ($mojo->cookie($cooName)) {
          # say "not exists cookies";
          if ($check_table->{result} == 1) {
            $create_newToken = _create_token($mojo, $store, $name_token, $timezone, $time_expire, $datetime_attr,
              $get_last_id);
            if ($create_newToken->{result} == 1) {
              my $token_coo = $create_newToken->{data}->{'token-coo'};
              # say "Name : $cooName";
              # say "Token Cookies : $token_coo";
              CellBIS::Auth::Token::Utils->_cookies_token($mojo, $token_coo, $time_expire);
            }
            
            # Place data :
            $data{'result'} = 1;
            $data{'data'} = $create_newToken->{data} if $create_newToken->{result} == 1;
            $data{'data'} = '' if exists $create_newToken->{result} == 0;
          }
          else {
            $create_table = $store->create_table();
            if ($create_table->{result} == 1) {
              $create_newToken = _create_token($mojo, $store, $name_token, $timezone, $time_expire, $datetime_attr,
                $get_last_id);
              if ($create_newToken->{result} == 1) {
                my $token_coo = $create_newToken->{data}->{'token-coo'};
                # say "Name : $cooName";
                # say "Token Cookies : $token_coo";
                CellBIS::Auth::Token::Utils->_cookies_token($mojo, $token_coo, $time_expire);
              }
              
              # Place data :
              $data{'result'} = 1;
              $data{'data'} = $create_newToken->{result} == 1 ? $create_newToken->{data} : '';
            }
            $mojo->app->log->error('[1501] Can\'t create table.') if ($create_table->{result} == 0);
          }
        }
        
        # IF Cookies is exists :
        else {
          # say "exists cookies";
          my $get_tokenCoo = '';
          if ($check_table->{result} == 1) {
            $get_tokenCoo = $mojo->cookie($cooName);
            my $check_token = _validation_token($mojo, $store, $get_tokenCoo);
            unless ($check_token->{result} == 1) {
              # say "Cookies sedang dibuat";
              $create_newToken = _create_token($mojo, $store, $name_token, $timezone, $time_expire, $datetime_attr,
                $get_last_id);
              if ($create_newToken->{result} == 1) {
                my $token_coo = $create_newToken->{data}->{'token-coo'};
                # say "Name : $cooName";
                # say "Token Cookies : $token_coo";
                CellBIS::Auth::Token::Utils->_cookies_token($mojo, $token_coo, $time_expire);
              }
              
              # Place data :
              $data{'result'} = 1;
              $data{'data'} = $create_newToken->{data} if $create_newToken->{result} == 1;
              $data{'data'} = '' if exists $create_newToken->{result} == 0;
            }
          }
          else {
            $create_table = $store->create_table();
            if ($create_table->{result} == 1) {
              $create_newToken = _create_token($mojo, $store, $name_token, $timezone, $time_expire, $datetime_attr,
                $get_last_id);
              if ($create_newToken->{result} == 1) {
                my $token_coo = $create_newToken->{data}->{'token-coo'};
                # say "Name : $cooName";
                # say "Token Cookies : $token_coo";
                CellBIS::Auth::Token::Utils->_cookies_token($mojo, $token_coo, $time_expire);
              }
              
              # Place data :
              $data{'result'} = 1;
              $data{'data'} = $create_newToken->{result} == 1 ? $create_newToken->{data} : '';
            }
            $mojo->app->log->error('[1501] Can\'t create table.') if ($create_table->{result} == 0);
          }
        }
        return \%data;
      }
      else {
        $mojo->app->log->error("Cannot create token");
      }
    });
  
  $app->helper(cbtoken_validation => sub {
      my ($mojo) = @_;
      my %data = ('result' => 2);
      
      my $token_name = $mojo->cbcfg_token_name();
      
      my $get_tokenCoo = '';
      if ($mojo->cookie($token_name)) {
        $get_tokenCoo = $mojo->cookie($token_name);
        my $token_val = _validation_token($mojo, $store, $get_tokenCoo);
        # warn j($token_val);
        %data = %{$token_val};
      }
      return \%data;
    });
  
  $app->helper(cbtoken_get => sub {
      my $mojo = shift;
      my %data = ('result' => 2);
      
      my $token_name = $mojo->cbcfg_token_name();
      
      my $get_tokenCoo = '';
      if ($mojo->cookie($token_name)) {
        $get_tokenCoo = $mojo->cookie($token_name);
        my $token_val = _validation_token($mojo, $store, $get_tokenCoo);
        if ($token_val->{result} == 1) {
          $data{'result'} = 1;
          $data{'data'} = $token_val->{data};
        }
        else {
          $data{'result'} = 0;
        }
      }
      return \%data;
    });
  
  # before used, Token has validated
  $app->helper(cbtoken_get_nocheck => sub {
      my $mojo = shift;
      my %data = ('result' => 2);
      
      my $token_name = $mojo->cbcfg_token_name();
      my $get_tokenCoo = '';
      if ($mojo->cookie($token_name)) {
        $get_tokenCoo = $mojo->cookie($token_name);
        my $original_token = CellBIS::Auth::Token::Utils->action_token('get', 'coo', $get_tokenCoo);
        $data{'result'} = 1;
        $data{'data'} = $original_token;
      }
      return \%data;
    });
  
  # before used, Token has validated
  $app->helper(cbtoken_get_cookies => sub {
      my $mojo = shift;
      my %data = ('result' => 2);
      
      my $token_name = $mojo->cbcfg_token_name();
      my $get_tokenCoo = '';
      if ($mojo->cookie($token_name)) {
        $get_tokenCoo = $mojo->cookie($token_name);
        $data{'result'} = 1;
        $data{'data'} = $get_tokenCoo;
      }
      return \%data;
    });
}

# Validation Token and delete for update :
# ------------------------------------------------------------------------
sub _validation_for_update {
  my $mojo = shift;
  my ($store, $token) = @_;
  my %data = ('result' => 3);
  
  my $original_token = CellBIS::Auth::Token::Utils->action_token('get', 'coo', $token);
  my $database_token = CellBIS::Auth::Token::Utils->action_token('create', 'db', $original_token);
  # my $delete_token = $store->delete($database_token);
  # warn $database_token;
  my $check_table = $store->check_table();
  if ($check_table->{result} == 1) {
    my $delete_token = $store->delete($database_token);
    # warn j($delete_token);
    if ($delete_token->{'result'} == 1) {
      $data{'result'} = 1;
    }
    else {
      $data{'result'} = 0;
    }
  }
  else {
    my $create_table = $store->create_table();
    if ($create_table->{result} == 1) {
      $data{'data'} = 2;
    }
  }
  return \%data;
}

# Validation Token :
# ------------------------------------------------------------------------
sub _validation_token {
  my $mojo = shift;
  my ($store, $token) = @_;
  my %data = ();
  
  #	say "validasi token";
  
  my $original_token = CellBIS::Auth::Token::Utils->action_token('get', 'coo', $token);
  my $database_token = CellBIS::Auth::Token::Utils->action_token('create', 'db', $original_token);
  # say "database token : $database_token";
  # warn "[From Cookies Token : $token]\n";
  # warn "[Result Orginal Token : $original_token]\n";
  # warn "[Result Database Token : $database_token]\n";
  my $check_table = $store->check_table();
  if ($check_table->{result} == 1) {
    my $check_token = $store->check($database_token);
    #	warn j($check_token);
    if ($check_token->{'result'} == 1) {
      $data{'result'} = 1;
      $data{'data'} = $database_token;
    }
    else {
      $data{'result'} = 0;
    }
  }
  else {
    my $create_table = $store->create_table();
    if ($create_table->{result} == 1) {
      $data{'data'} = 2;
    }
  }
  return \%data;
}

# Create Token :
# ------------------------------------------------------------------------
sub _create_token {
  my $mojo = shift;
  my $store = shift;
  my $arg_len = scalar @_;
  my $name = 'undefined';
  my $timezone = $mojo->cbcfg_timezone();
  my $time_expire = '+3h';
  my $datetime_attr = '';
  my $get_last_id = 0;
  #	$mojo->app->log->error();
  if ($arg_len == 4 or $arg_len >= 5) {
    $name = $_[0] if (exists $_[0] and $_[0] ne '');
    $timezone = $_[1] if (exists $_[1] and $_[1] ne '');
    $time_expire = $_[2] if (exists $_[2] and $_[2] ne '' and $_[2] =~ m/^[\+\-]([a-zA-Z0-9]+)$/);
    $datetime_attr = $_[3] if exists $_[3] and ref($_[3]) eq "HASH" && keys %{$_[3]} != 0;
    $get_last_id = $_[4] if defined $_[4];
    
    my %data = ('result' => 2);
    my $get_dataToken = '';
    my $list_ip = {
      'x-forwarder-for' =>
        $mojo->req->headers->header('X-Forwarded-For') ? $mojo->req->headers->header('X-Forwarded-For') : '',
      'x-real-ip'       => $mojo->req->headers->header('X-Real-IP') ? $mojo->req->headers->header('X-Real-IP') : '',
      'remote-ip'       => $mojo->tx->remote_address ? $mojo->tx->remote_address : '',
      'ua'              => $mojo->req->headers->user_agent ? $mojo->req->headers->user_agent : '',
    };
    
    $get_dataToken = CellBIS::Auth::Token::Utils->data_cookies($get_last_id);
    if ($get_dataToken->{result} == 1) {
      my $for_token = $get_dataToken->{r_token};
      #			warn "[Original Token = $for_token]\n";
      my $token_db = CellBIS::Auth::Token::Utils->action_token('create', 'db', $for_token);
      my $token_coo = CellBIS::Auth::Token::Utils->action_token('create', 'coo', $for_token);
      my $get_time = CellBIS::Auth::Utils->get_time($timezone, $time_expire, $datetime_attr);
      #			warn "[Database Token = $token_db]\n";
      #			warn "[Cookies Token = $token_coo]\n";
      #			my $r_time = $get_time->{custom};
      #			my $r_dateTime = $get_time->{datetime};
      #			warn "[Time Custom = $r_time]\n";
      #			warn dumper $get_time;
      
      my $create_token = $store->create({
        'name'    => $name,
        'ip'      => j($list_ip),
        'cookies' => $token_db,
        'expire'  => {
          'datetime'  => $get_time->{custom},
          'sql_event' => $time_expire
        }
      });
      if ($create_token->{result} eq 1) {
        $data{'result'} = 1;
        $data{'data'} = {
          'expire-coo' => $time_expire,
          'token-db'   => $token_db,
          'token-coo'  => $token_coo,
          'token-ori'  => $for_token,
        };
        #				warn "Expire Cookies Token = $time_expire\n";
      }
      else {
        $data{'result'} = 0;
        $mojo->app->log->error('[1502] Token can\'t store in database');
      }
    }
    else {
      $mojo->app->log->fatal('[1301] Token can\'t to create');
    }
    return \%data;
  }
}

1;

=encoding utf8

=head1 NAME

Mojolicious::Plugin::CellbisAuth::Token - Mojolicious Plugin

=head1 SYNOPSIS

  # Mojolicious
  $self->plugin('CellbisAuth::Token' => {
    'db_config' => {
      'db_name' => 'table_name', # Table Name,
      'db_host' => 'localhost', # mysql host, default "localhost"
      'db_user' => 'username', # username user database.
      'db_pass' => 'password', # password user database.
    },
    'db_type' => 'mysql', # Type database
    'error_dbi' => {} # hashref attr DBI
  });

    # Mojolicious::Lite
    plugin 'CellbisAuth::Token' => {
        'db_config' => {
        'db_name' => 'table_name', # Table Name,
        'db_host' => 'localhost', # mysql host, default "localhost"
        'db_user' => 'username', # username user database.
        'db_pass' => 'password', # password user database.
      },
      'db_type' => 'mysql', # Type database
      'error_dbi' => {} # hashref attr DBI
    };

  # -----------------------------------------------------------
  # To using plugin in Controller.
  # -----------------------------------------------------------

  # Create Token :
  $c->cbtoken_create({
    timezone => 'Asia/Makassar',
    time_expire => '1h', # For 1 hour ahead. 2d => for 2 days ahead.
    dt_attr => {
      'date' => '-', # output date like, "/" => 1990/01/25, "-" => 1990-01-25
      'time' => ':', # output time like, ":" => 10:30:50, "_" => 10_30_50
      'datetime' => ' ', # result of delimiter like 1990-01-25 10:30:50
      'format' => 'YYYY-MM-DD', # For date format
    },
  });

  # Update Token
  $c->cbtoken_update({
    timezone => 'Asia/Makassar',
    time_expire => '1h', # For 1 hour ahead. 2d => for 2 days ahead.
    dt_attr => {
      'date' => '-', # output date like, "/" => 1990/01/25, "-" => 1990-01-25
      'time' => ':', # output time like, ":" => 10:30:50, "_" => 10_30_50
      'datetime' => ' ', # result of delimiter like 1990-01-25 10:30:50
      'format' => 'YYYY-MM-DD', # For date format
    },
  });

	# To Token validaton :
	my $token_val = $c->cbtoken_validation();


=head1 DESCRIPTION

L<Mojolicious::Plugin::CellbisAuth::Token> is a L<Mojolicious> plugin for Token to Authentication.

=head1 METHODS

L<Mojolicious::Plugin::CellbisAuth::Token> inherits all methods from
L<Mojolicious::Plugin> and implements the following new ones.

Register plugin in L<Mojolicious> application.

=head1 SEE ALSO

L<Mojolicious>, L<Mojolicious::Guides>, L<http://mojolicious.org>.

=cut
