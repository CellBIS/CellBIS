package Mojolicious::Plugin::CellbisConfig;
use Mojo::Base 'Mojolicious::Plugin';

use Data::Dumper;
use Mojo::JSON 'j';
use Mojo::Util 'dumper';
use CellBIS::Utils::Config;

# ABSTRACT: CellBIS Toolkit for Handle configure apps based on Mojolicious Plugin.
our $VERSION = '0.1000';

sub register {
  my ($self, $app, $config) = @_;

	my $helper_name = 'cbcfg_';

	$app->hook(after_build_tx => sub {
			my ($tx, $mojo) = @_;

			$mojo->sessions->cookie_domain($config->{'session_cookie'}->{domain})
				if exists $config->{'session_cookie'}->{domain};
			$mojo->sessions->cookie_name($config->{'session_cookie'}->{name})
				if exists $config->{'session_cookie'}->{name};
			$mojo->sessions->cookie_path($config->{'session_cookie'}->{path})
				if exists $config->{'session_cookie'}->{path};
			$mojo->sessions->default_expiration($config->{'session_cookie'}->{expires})
				if exists $config->{'session_cookie'}->{expires};
			$mojo->sessions->secure($config->{'session_cookie'}->{secure})
				if exists $config->{'session_cookie'}->{secure};

		}) if exists $config->{'session_cookie'};

	# For Auth login Secret :
	$app->helper(cbcfg_login_secret => sub {
			my $mojo = shift;
			my $cfg_login = '';
			if (exists $_[0] and ref($_[0]) eq "HASH") {
				$cfg_login = $_[0];
			}

			return ref($_[0]) eq "HASH" ?
				$cfg_login->{secret} :
					exists $config->{login_secret} ? $config->{login_secret} : CellBIS::Utils::Config->secret_login_config();
		});

	# For TimeZone :
	$app->helper(cbcfg_timezone => sub { return exists $config->{timezone} ? $config->{timezone} : 'Asia/Makassar'; });

	# For All Domain and host :
	$app->helper(cbcfg_domain => sub {
			my $mojo = shift;
			if (ref($config->{domain}) eq "HASH") {
				return exists $config->{domain}->{name} ? $config->{domain}->{name} : $mojo->req->url->base->host;
			} else {
				return exists $config->{domain} ?
					$config->{domain} :
					$mojo->req->url->base->host;
			}
		});
	$app->helper(cbcfg_domain_host => sub {
			my $mojo = shift;
			if (ref($config->{domain}) eq "HASH") {
				my $host = exists $config->{domain}->{name} ? $config->{domain}->{name} : $mojo->req->url->base->host;
				return get_protocol($mojo, $config).'://'.$host;
			} else {
				return exists $config->{domain} ?
					get_protocol($mojo, $config).'://'.$config->{domain} :
					get_protocol($mojo, $config).'://'.$mojo->req->url->base->host;
			}
		});
	$app->helper(cbcfg_domain_content => sub {
			my $mojo = shift;
			if (ref($config->{domain}) eq "HASH") {
				my $domain = exists $config->{domain}->{content} ?
					$config->{domain}->{content} :
						(exists $config->{domain}->{name} ? $config->{domain}->{name} : $mojo->req->url->base->host);
				return $domain;
			} else {
				return exists $config->{domain} ?
					$config->{domain} :
					$mojo->req->url->base->host;
			}
		});
	$app->helper(cbcfg_domain_content_host => sub {
			my $mojo = shift;
			if (ref($config->{domain}) eq "HASH") {
				my $domain = exists $config->{domain}->{content} ?
					get_protocol($mojo, $config).'://'.$config->{domain}->{content} :
						(exists $config->{domain}->{name} ?
							get_protocol($mojo, $config).'://'.$config->{domain}->{name} :
							get_protocol($mojo, $config).'://'.$mojo->req->url->base->host);
				return $domain;
			} else {
				return exists $config->{domain} ?
					get_protocol($mojo, $config).'://'.$config->{domain} :
					get_protocol($mojo, $config).'://'.$mojo->req->url->base->host;
			}
		});

	# For Token :
	$app->helper(cbcfg_token_name => sub {
			return exists $config->{token_name} ? $config->{token_name} : "__htacc"}
	);

	# For Session :
	if (ref($config->{session_cookie}) eq "HASH") {
		$app->helper($helper_name.'ssn_domain' => sub { return $config->{'session_cookie'}->{'domain'} })
			if exists $config->{'session_cookie'}->{'domain'};
		$app->helper($helper_name.'ssn_name' => sub { return $config->{'session_cookie'}->{'name'} })
			if exists $config->{'session_cookie'}->{'name'};
		$app->helper($helper_name.'ssn_expires' => sub { return $config->{'session_cookie'}->{expires} })
			if exists $config->{'session_cookie'}->{expires};
		$app->helper($helper_name.'ssn_secure' => sub { return $config->{'session_cookie'}->{secure} })
			if exists $config->{'session_cookie'}->{secure};
	} else {
		$app->helper($helper_name.'ssn_name' => sub { return $config->{session_cookie} })
			if exists $config->{session_cookie};
	}

	# For get session_cookie configure :
	$app->helper(cbcfg_ssn_get_config => sub { return exists $config->{session_cookie} ? $config->{session_cookie} : {}; });

	# For configure Session :
	$app->helper(cbcfg_session_config => sub {
			my $mojo = shift;
			my $arg_len = scalar @_;
			unless ($arg_len == 0) {
				my $ssn_config = $_[0];
				if (ref($ssn_config) eq "HASH") {
					my $size_ssnCfg = scalar keys %{$ssn_config};
					$app->hook(after_build_tx => sub {
							my ($tx, $afBtx) = @_;
							$afBtx->sessions->cookie_domain($ssn_config->{domain}) if exists $ssn_config->{domain};
							$afBtx->sessions->cookie_name($ssn_config->{name}) if exists $ssn_config->{name};
							$afBtx->sessions->cookie_path($ssn_config->{path}) if exists $ssn_config->{path};
							$afBtx->sessions->default_expiration($ssn_config->{expires}) if exists $ssn_config->{expires};
							$afBtx->sessions->secure($ssn_config->{secure}) if exists $ssn_config->{secure};
						}) unless $size_ssnCfg == 0;
				}
			}
		});

	# For "etc" configure :
	$app->helper(cbcfg_etc_conf => sub { return exists $config->{etc_conf} ? $config->{etc_conf} : {}; });

	# For "custom" configure :
	if (exists $config->{custom}) {
		my @custom = @{$config->{custom}};
		my $i = 0;
		my $size_custom = scalar @custom;
		while ($i < $size_custom) {
			if (check_hashref_custom_helper($custom[$i])) {
				if (ref($custom[$i]->{value}) eq "CODE") {
					$app->helper($custom[$i]->{name} => $custom[$i]->{value});
				} else {
					$app->helper($custom[$i]->{name} => sub { $custom[$i]->{value} });
				}
			}
			$i++;
		}
	}
}

# Get Protocol :
# ------------------------------------------------------------------------
sub get_protocol {
	my ($mojo, $config) = @_;

	# For Protocol Checker :
	my $get_protocol = $mojo->req->url->to_abs;
	$get_protocol = $get_protocol =~ m/^https/ ? 'https' : 'http';
	return exists $config->{protocol} ? $config->{protocol} : $get_protocol;
}

# Check hashref for custom helper :
# ------------------------------------------------------------------------
sub check_hashref_custom_helper {
	my ($hash) = @_;

	if (exists $hash->{name} && exists $hash->{value}) {
		return 1;
	}
	return 0;
}

1;

=encoding utf8

=head1 NAME

Mojolicious::Plugin::CellbisConfig - Mojolicious Plugin

=head1 SYNOPSIS

	# Mojolicious
	$self->plugin('CellbisConfig' => {
	  login_secret => 'Contoh Secret Login';
	  timezone => 'Asia/Makassar',
	  domain => {
	    name => 'mydomain.tld',
	    content => 'mycontent.mydomain.tld',
	  },
	  token_name => 'MyToken_name',
	  session_cookie => {
	    domain => '.example.com', # your domain name.
	    name => '__session_coo', # Name of Cookies Session
	    path => '/', # Path URL
	    expires => time + 200;
	    secure => 0;
	  },
	  etc_conf => $etc_cfg,
	  custom => [
	    {
	      name => '<name_helper>',
	      value => '<value_helper>'
	    },
	  ]
	});

	# Mojolicious::Lite
	plugin 'CellbisConfig' => {
	  login_secret => 'Contoh Secret Login';
	  timezone => 'Asia/Makassar',
	  domain => {
	    name => 'mydomain.tld',
	    content => 'mycontent.mydomain.tld',
	  },
	  token_name => 'MyToken_name',
	  session_cookie => {
	    domain => '.example.com', # your domain name.
	    name => '__session_coo', # Name of Cookies Session
	    path => '/', # Path URL
	    expires => time + 200;
	    secure => 0;
	  },
	  etc_cfg => $etc_cfg
	};

=head1 DESCRIPTION

L<Mojolicious::Plugin::CellbisConfig> is a L<Mojolicious> plugin config from CellBIS Toolkit.

=head1 METHODS

L<Mojolicious::Plugin::CellbisConfig> inherits all methods from
L<Mojolicious::Plugin> and implements the following new ones.

=head2 register

  $plugin->register(Mojolicious->new);

Register plugin in L<Mojolicious> application.

=head1 SEE ALSO

L<Mojolicious>, L<Mojolicious::Guides>, L<http://mojolicious.org>.

=cut
