package Mojolicious::Plugin::CellbisAuth;
use Mojo::Base 'Mojolicious::Plugin';

use Carp ();
use Scalar::Util qw(blessed looks_like_number);
use Mojo::JSON qw(j decode_json);
use Mojo::Util qw(dumper);
use CellBIS::enkripsi;
use CellBIS::Auth::Utils;
use CellBIS::Auth::Store::Auth_login;
use CellBIS::Auth::Store::Auth_login_old;

# ABSTRACT: CellBIS Toolkit for Handle Authentication based on Mojolicious Plugin.
our $VERSION = '0.1000';

# Register Plugin :
# ------------------------------------------------------------------------
sub register {
  my $self = shift;
  #  my ($self, $app, $config) = @_;
  my $arg_len = scalar @_;
  my $app = $_[0];
  my $config = {};
  my $size_config = 0;
  my $dbio;
  my $store;
  
  if ($arg_len == 3) {
    if (ref($_[1]) eq "HASH") {
      $config = $_[1];
      $size_config = scalar keys %{$config};
    }
  }
  my $secret = $app->cbcfg_login_secret();
  if (($size_config != 0) and (exists $config->{db})) {
    $app->plugin('CellbisDBIO' => $config->{db});
    $dbio = $app->dbioLite($config->{db});
  }
  else {
    $dbio = $app->dbioLite();
  }
  $store = CellBIS::Auth::Store::Auth_login->new($secret, $dbio);
  
  my $cfg_cookies = 'cb_lgn';
  my $cfg_expire_login = '3h';
  my $cfg_expire_login_long = '1M';
  
  if ($size_config != 0) {
    $cfg_cookies = $config->{config}->{cookies} if exists $config->{config} and exists $config->{config}->{cookies};
    $cfg_expire_login = $config->{config}->{expire_short} if exists $config->{config} and exists $config->{config}->{expire_short};
    $cfg_expire_login_long = $config->{config}->{expire_long} if exists $config->{config} and exists $config->{config}->{expire_long};
    
    $cfg_cookies =~ s/([\-\+])//g;
    $cfg_expire_login =~ s/([\-\+])//g;
    $cfg_expire_login_long =~ s/([\-\+])//g;
  }
  
  $app->helper(cb_has_auth => sub {
      my $mojo = shift;
      my %data = ('result' => 2);
      # $mojo->app->log->info('check login');
      
      # $store = CellBIS::Auth::Store::Auth_login->new($secret, $app->dbioLite());
      
      if ($mojo->cookie($cfg_cookies)) {
        my $get_cookies = $mojo->cookie($cfg_cookies);
        $get_cookies =~ s/\"//g;
        my $check_login = $self->check_userLogin($mojo, $store, $get_cookies);
        if ($check_login->{result} == 1) {
          $data{'result'} = 1;
          $data{'cookies'} = $check_login->{cookies};
          $data{'cookies_lgn'} = $check_login->{cookies_lgn};
          $data{'id_user'} = $check_login->{id_user};
          $data{'id_login'} = $check_login->{id_login};
        }
        else {
          $mojo->cookie($cfg_cookies => '', { expires => 1 });
        }
      }
      return \%data;
    });
  
  $app->helper(cb_to_auth => sub {
      my $mojo = shift;
      my $args_len = scalar @_;
      my %data = ('result' => 2);
      my $id_user = '';
      my $remember = '';
      my $other_data = '';
      if ($args_len == 2) {
        $id_user = $_[0] if looks_like_number($_[0]);
        $remember = $_[1] if looks_like_number($_[0]);
      }
      if ($arg_len >= 3) {
        $id_user = $_[0] if looks_like_number($_[0]);
        $remember = $_[1] if looks_like_number($_[0]);
        $other_data = $_[2];
      }
      
      # $store = CellBIS::Auth::Store::Auth_login->new($secret, $app->dbioLite());
      
      if ($args_len != 0) {
        my $get_last_id = $store->get_last_id();
        $get_last_id = $get_last_id->{data};
        say $get_last_id;
        # say "Secret Login : $secret";
        
        my $create_userLogin = $self->create_userLogin(
          $mojo, $dbio, $store, $secret, $id_user, $remember, $other_data,
          $cfg_cookies, $cfg_expire_login, $cfg_expire_login_long, $get_last_id
        );
        if ($create_userLogin->{result} == 1) {
          %data = %{$create_userLogin};
        }
      }
      return \%data;
    });
  
  $app->helper(cb_to_logout => sub {
      my $mojo = shift;
      my %data = ('result' => 2);
      
      # $store = CellBIS::Auth::Store::Auth_login->new($secret, $app->dbioLite());
      
      if ($mojo->cookie($cfg_cookies)) {
        my $get_cookies = $mojo->cookie($cfg_cookies);
        my $check_login = $self->check_userLogin($mojo, $store, $get_cookies);
        # say "result \$check_login - cb_to_logout";
        # say dumper $check_login;
        if ($check_login->{result} == 1) {
          # say "login True";
          my $data_login = {
            'cookies'  => $check_login->{cookies},
            'id_user'  => $check_login->{id_user},
            'id_login' => $check_login->{id_login}
          };
          
          # Delete Login User :
          my $delete_login = $store->delete($data_login);
          # say "delete Login : ";
          # say dumper $delete_login;
          if ($delete_login->{result} == 1) {
            # say "delete login";
            $mojo->cookie($cfg_cookies => '', { expires => 1 });
            my $del_ssn = CellBIS::Auth::Utils->delete_session_login($mojo, $get_cookies);
            $data{'result'} = 1;
            $data{'id_user'} = $check_login->{id_user};
            $data{'session'} = $del_ssn;
          }
          else {
            $data{'msg'} = 'User can\'t logout';
          }
        }
        else {
          # say "login False";
          $mojo->cookie($cfg_cookies => '', { expires => 1 });
          $data{'msg'} = 'User is not login'
        }
      }
      else {
        # say "login True";
        $data{'msg'} = 'No cookies login';
      }
      return \%data;
    });
  
  $app->helper(cb_token_and_auth_val => sub {
      my $mojo = shift;
      my ($r_token, $r_auth) = @_;
      my %data = ();
      
      if ($r_token->{result} == 1) {
        if ($r_auth->{result} == 1) {
          $data{'result'} = 1;
          $data{'data'} = $r_auth->{id_user};
        }
        else {
          $data{'result'} = 0;
        }
      }
      else {
        if ($r_auth->{result} == 1) {
          $data{'result'} = 3;
        }
        else {
          $data{'result'} = 2;
        }
      }
      return \%data;
    });
  
  $app->helper(cb_auth_data => sub {
      my $mojo = shift;
      my %data = ('result' => 2);
      
      # $store = CellBIS::Auth::Store::Auth_login->new($secret, $app->dbioLite());
      
      if ($mojo->cookie($cfg_cookies)) {
        my $get_cookies = $mojo->cookie($cfg_cookies);
        $get_cookies =~ s/\"//g;
        my $check_login = $self->check_userLogin($mojo, $store, $get_cookies);
        if ($check_login->{result} == 1) {
          $data{'result'} = 1;
          $data{'data'} = $check_login->{id_user};
        }
        else {
          $data{'result'} = 0;
        }
      }
      return \%data;
    });
  
  # before used, Login has validated
  $app->helper(cb_auth_data_cookies => sub {
      my $mojo = shift;
      my %data = ('result' => 0);
      
      if ($mojo->cookie($cfg_cookies)) {
        my $get_cookies = $mojo->cookie($cfg_cookies);
        $get_cookies =~ s/\"//g;
        $data{'result'} = 1;
        $data{'data'} = $get_cookies;
      }
      return \%data;
    });
  
}

#############################################################################
# FOR CHECK LOGIN
#############################################################################

# Check User Login :
# ------------------------------------------------------------------------
sub check_userLogin {
  my $self = shift;
  my ($mojo, $store, $cookies_login) = @_;
  my %data = ('result' => 2);
  
  my $coo_ori = CellBIS::Auth::Utils->action_cookiesLogin('get', 'coo', $cookies_login);
  my $coo_db = CellBIS::Auth::Utils->action_cookiesLogin('create', 'db', $coo_ori);
  # say "Cookies Ori : $coo_ori";
  # say "Cookies DB : $coo_db";
  my $get_userLogin = $self->_get_userlogin($mojo, $coo_ori);
  # say "result \$get_userLogin : ";
  # say dumper $get_userLogin;
  if ($get_userLogin->{result} == 1) {
    my $data_login = {
      'cookies'  => $coo_db,
      'id_user'  => $get_userLogin->{id_user},
      'id_login' => $get_userLogin->{id_login}
    };
    
    my $check_table = $store->check_table();
    if ($check_table->{result} == 1) {
      my $check_cooDB = $store->check($data_login);
      if ($check_cooDB->{result} == 1) {
        $data{'result'} = 1;
        $data{'cookies'} = $check_cooDB->{data};
        $data{'cookies_lgn'} = $cookies_login;
        $data{'id_user'} = $get_userLogin->{id_user};
        $data{'id_login'} = $get_userLogin->{id_login};
      }
      else {
        %data = %{$check_cooDB};
      }
    }
    else {
      my $create_table = $store->create_table();
      if ($create_table->{result} == 1) {
        $data{'result'} = 0;
      }
    }
  }
  return \%data;
}

# Get Cookies login :
# ------------------------------------------------------------------------
sub _get_userlogin {
  my $self = shift;
  my ($mojo, $cookies_ori) = @_;
  my %data = ('result' => 0);
  my $getKey_enc = CellBIS::enkripsi->getKey_enc($cookies_ori);
  
  # Get Data Session :
  my $ssn_name = CellBIS::enkripsi->Encoder('lgn', $getKey_enc);
  if (exists $mojo->session->{$ssn_name}) {
    my $data_ssn = CellBIS::enkripsi->Decoder($mojo->session->{$ssn_name}, $getKey_enc);
    my $get_dataLogin = decode_json($data_ssn);
    
    $data{'result'} = 1;
    $data{'id_user'} = $get_dataLogin->[0];
    $data{'id_login'} = $get_dataLogin->[1];
  }
  return \%data;
}

#############################################################################
# FOR LOGIN
#############################################################################

# Create User Login :
# ------------------------------------------------------------------------
sub create_userLogin {
  my $self = shift;
  my $mojo = shift;
  my $arg_len = scalar @_;
  
  my ($dbio, $store, $secret, $id_user, $remember, $coo_name, $expire, $expire_long, $get_last_id);
  # ('', '', '', '', '', '', '', '', '', );
  my $other = '';
  
  if ($arg_len == 9) {
    ($dbio, $store, $secret, $id_user, $remember, $coo_name, $expire, $expire_long, $get_last_id) = @_;
  }
  if ($arg_len >= 10) {
    ($dbio, $store, $secret, $id_user, $remember, $other, $coo_name, $expire, $expire_long, $get_last_id) = @_;
  }
  
  my %data = ('result' => 2);
  my $time_login = CellBIS::Auth::Utils->get_time_login($remember, $expire, $expire_long);
  # say "create_userLogin";
  # say "time login : $time_login";
  # say dumper \@_;
  
  my $check_table;
  my $create_table;
  my $create_userLogin;
  $check_table = $store->check_table();
  if ($check_table->{result} == 1) {
    # say "there are table";
    $create_userLogin = _userLogin_cookies($mojo, $store, $secret, $id_user, $time_login, $get_last_id);
    if ($create_userLogin->{result} == 1) {
      # say "Buat User Login Auth";
      my $time = time();
      my $expire_login = $time + $create_userLogin->{data}->{'expire-coo'};
      my $token_coo = $create_userLogin->{data}->{'token-coo'};
      my $token_ori = $create_userLogin->{data}->{'token-ori'};
      my $id_login = $create_userLogin->{data}->{id_login};
      # CellBIS::Auth::Utils->_create_cookies_login($mojo, $token_coo, $coo_name, $expire, $expire_long);
      CellBIS::Auth::Utils->_create_cookies_login($mojo, $token_coo, $expire_login, $coo_name);
      CellBIS::Auth::Utils->_create_session_login($mojo, $token_ori, $id_user, $id_login, $other);
    }
    
    # Place data :
    $data{'result'} = 1;
    $data{'data'} = $create_userLogin->{result} == 1 ? $create_userLogin->{data} : '';
  }
  else {
    # say "No Table";
    $create_table = $store->create_table();
    if ($create_table->{result} == 1) {
      # say "Buat Table";
      my $create_table_old = CellBIS::Auth::Store::Auth_login_old->create_table($secret, $dbio);
      my $create_trigger = $store->trigger();
      $create_userLogin = _userLogin_cookies($mojo, $store, $secret, $id_user, $time_login, $get_last_id);
      # say "result trigger :";
      # say dumper $create_userLogin;
      if ($create_userLogin->{result} == 1) {
        # say "Buat User Login Auth";
        my $time = time();
        my $expire_login = $time + $create_userLogin->{data}->{'expire-coo'};
        my $token_coo = $create_userLogin->{data}->{'token-coo'};
        my $token_ori = $create_userLogin->{data}->{'token-ori'};
        my $id_login = $create_userLogin->{data}->{id_login};
        CellBIS::Auth::Utils->_create_cookies_login($mojo, $token_coo, $expire_login, $coo_name);
        CellBIS::Auth::Utils->_create_session_login($mojo, $token_ori, $id_user, $id_login, $other);
      }
      
      # Place data :
      $data{'result'} = 1;
      $data{'data'} = $create_userLogin->{result} == 1 ? $create_userLogin->{data} : '';
      $data{'trigger'} = $create_trigger;
    }
    $mojo->app->log->error('[1501] Can\'t create table.') unless ($create_table->{result} == 1);
  }
  return \%data;
}

# Create User Login Cookies :
# ------------------------------------------------------------------------
sub _userLogin_cookies {
  my $mojo = shift;
  my ($store, $secret, $id_user, $time_login, $get_last_id) = @_;
  my %data = ('result' => 2);
  # say "_userLogin_cookies :";
  # say dumper \@_;
  
  my $abbr_time = $time_login->{'abbr_time'};
  my $count_time = $time_login->{'count_time'};
  my $time_zone = $mojo->cbcfg_timezone();
  
  my $list_ip = {
    'x-forwarder-for' => $mojo->req->headers->header('X-Forwarded-For') ?
      $mojo->req->headers->header('X-Forwarded-For')                    : '',
    'x-real-ip'       => $mojo->req->headers->header('X-Real-IP') ?
      $mojo->req->headers->header('X-Real-IP')                    : '',
    'remote-ip'       => $mojo->tx->remote_address ?
      $mojo->tx->remote_address                    : '',
    'ua'              => $mojo->req->headers->user_agent ? $mojo->req->headers->user_agent : '',
  };
  
  my $get_cookiesLogin = CellBIS::Auth::Utils->_data_cookies($secret, $get_last_id);
  # say "Hasil Get cookies login = $get_cookiesLogin\n";
  if ($get_cookiesLogin->{result} == 1) {
    my $for_cookiesLogin = $get_cookiesLogin->{r_coo};
    # say "original Cookies : $for_cookiesLogin";
    my $userLogin_db = CellBIS::Auth::Utils->action_cookiesLogin('create', 'db', $for_cookiesLogin);
    my $userLogin_cookies = CellBIS::Auth::Utils->action_cookiesLogin('create', 'coo', $for_cookiesLogin);
    my $userLogin_time = CellBIS::Auth::Utils->get_time($time_zone, $abbr_time);
    
    # say "Time Custom : $userLogin_time->{custom}";
    # say "SQL Even Time : $abbr_time";
    
    my $create_userLogin = $store->create({
      'id_user' => $id_user,
      'ip'      => j($list_ip),
      'cookies' => $userLogin_db,
      'expire'  => {
        'datetime'  => $userLogin_time->{custom},
        'sql_event' => $abbr_time
      }
    });
    if ($create_userLogin->{result} == 1) {
      $data{'result'} = 1;
      $data{'data'} = {
        'id_login'   => $create_userLogin->{data},
        'expire-coo' => $count_time,
        'token-db'   => $userLogin_db,
        'token-coo'  => $userLogin_cookies,
        'token-ori'  => $for_cookiesLogin,
      };
    }
    else {
      $data{'result'} = 0;
      $mojo->app->log->error('[1502] UserLogin Token can\'t store in database');
    }
  }
  else {
    $data{'result'} = 0;
    $mojo->app->log->fatal('[1301] UserLogin Token can\'t to create');
  }
  return \%data;
}

1;

=encoding utf8

=head1 NAME

Mojolicious::Plugin::CellbisAuth - Mojolicious Plugin for Login Authentication.

=head1 SYNOPSIS

  # Mojolicious
  $self->plugin('CellbisAuth' => {
    'logout_record' => 1, # 0 -> logout not recorded, 1 -> logout is recorded
    'config' => {
      'cookies' => 'myauth', # example name of cookies login.
      'expire_long' => '1Y', # example expire login if remember login.
      'expire_short' => '3h', # example for default expire login if not remember login
    },
    'db' => { # IF Different database (Optional).
      'db_config' => {
        'db_name' => 'table_name', # Table Name,
        'db_host' => 'localhost', # mysql host, default "localhost"
        'db_user' => 'username', # username user database.
        'db_pass' => 'password', # password user database.
      },
      'db_type' => 'mysql', # Type database
      'error_dbi' => {} # hashref attr DBI
    }
  });

  # Mojolicious::Lite
  plugin 'CellbisAuth' => {
    'config' => {
      'cookies' => 'myauth', # example name of cookies login.
      'expire_long' => '1Y', # example expire login if remember login.
      'expire_short' => '3h', # example for default expire login if not remember login
    },
    'db' => { # IF Different database (Optional).
      'db_config' => {
        'db_name' => 'table_name', # Table Name,
        'db_host' => 'localhost', # mysql host, default "localhost"
        'db_user' => 'username', # username user database.
        'db_pass' => 'password', # password user database.
      },
      'db_type' => 'mysql', # Type database
      'error_dbi' => {} # hashref attr DBI
    }
  };
  
  # -----------------------------------------------------------
  # To using plugin in Controller.
  # -----------------------------------------------------------

  # In controller or "under".
  # To validation authentication :
  $c->cb_is_auth(); # To check if page is authenticated.

  # Validation Auth if with "CellbisAuth::Token"
  $c->cb_token_and_auth_val();

  # To Create Authentication
  $c->cb_to_auth($id_user, $remember);

  # To Logout Authentication or other word "unauth"
  $c->cb_to_logout();

  # To get data authentication :
  $c->cb_auth_data();

  # To Get cookies name authentication :
  $c->cb_auth_data_cookies();

=head1 DESCRIPTION

L<Mojolicious::Plugin::CellbisAuth> is a L<Mojolicious> plugin for Authentication.
This plugin optional related to L<Mojolicious::Plugin::CellbisAuth::Token>.

=head1 METHODS

L<Mojolicious::Plugin::CellbisAuth> inherits all methods from
L<Mojolicious::Plugin> and implements the following new ones.

=head2 register

  $plugin->register(Mojolicious->new);

Register plugin in L<Mojolicious> application.

=head1 SEE ALSO

L<Mojolicious>, L<Mojolicious::Guides>, L<http://mojolicious.org>.

=cut
