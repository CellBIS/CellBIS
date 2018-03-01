package Mojolicious::Plugin::CellbisEtc;
use Mojo::Base 'Mojolicious::Plugin';

use Data::Dumper;
use Hash::MultiValue;
#use Config::INI;
use Config::INI::Reader;
use Config::INI::Writer;
use Mojo::JSON 'j';
use Mojo::Util 'dumper';
use CellBIS::Utils::Config;

our $VERSION = '0.1000';

sub register {
	my ($self, $app) = @_;

	$app->helper(cbetc_read => sub {
			my $mojo = shift;
			my $arg_len = scalar @_;
			my $loc_cfg = '';
			my %data = (
				'result' => 1,
			);
			my $data_cfg = {
				'for_app' => {
					'domain' => 'localost:3000',
					'token_name_web' => '__ti',
				},
				'for_secret' => j([
					'EBppAWpFMxAMAqMipJAJDEixAqMxAWFJWJIpEMqAMqA',
					'U35CgNa3pMJxpqiWKrsLdPyrEMpAWMpMfMWsMe5FBxJ'
				])
			};
			unless ($arg_len == 0) {
				$loc_cfg = $_[0];
				if ($loc_cfg ne '') {
					if (-f $loc_cfg) {
						$data{config} = Config::INI::Reader->read_file($loc_cfg);
					}
				} else {
					$data{'result'} = 0;
					$data_cfg->{'for_etc'} = {
						loc_cfg => $loc_cfg
					};
					$data{'config'} = $data_cfg;
					Config::INI::Writer->write_file($data_cfg, $loc_cfg);
				}
			}
			return \%data;
		});

	$app->helper(cbetc_write => sub {
			my $mojo = shift;
			my $arg_len = scalar @_;
			my %data = ('result' => 0);
			my $type_cfg = '';
			my $loc_cfg = '';
			my $key_cfg = '';
			my $value_cfg = '';
			my $data_cfg = {};
			my $type_action = '';

			if ($arg_len == 3) {
				$type_action = 'new';
				$type_cfg = $_[0] if $_[0] ne '';
				$loc_cfg = $_[1] if $_[1] ne '';
				$data_cfg = $_[2] if ref $_[2] eq "HASH";
			}

			if ($arg_len == 4) {
				$type_action = 'edit';
				$loc_cfg = $_[0] if $_[0] ne '';
				$key_cfg = $_[1] if $_[1] ne '';
				$value_cfg = $_[2] if $_[2] ne '';
			}

			if ($type_action eq 'new') {
				my $size_cfg = scalar keys %{$data_cfg};
				unless ($size_cfg == 0) {
					Config::INI::Writer->write_file($data_cfg, $loc_cfg);
					$data{'result'} = 1;
					$data{'config'} = $data_cfg;
				}
			}

			if ($type_action eq 'edit') {
				if (-f $loc_cfg) {
					my $read_cfg = Config::INI::Reader->read_file($loc_cfg);

					my $edit_cfg = Hash::MultiValue->new(%{$read_cfg});
					$edit_cfg->set($key_cfg => $value_cfg);
					my $result_edit = $edit_cfg->as_hashref;
					$data{'result'} = 1;
					$data{'config'} = $result_edit;
				}
			}
			return \%data;
		});
}

1;

=encoding utf8

=head1 NAME

Mojolicious::Plugin::CellbisEtc - Mojolicious Plugin

=head1 SYNOPSIS

  # Mojolicious
  $self->plugin('CellbisEtc');

  # Mojolicious::Lite
  plugin 'CellbisEtc';

  ## To Use plugin :
  $c->cbetc_read('loc_file_cfg');
  $c->cbetc_write('loc_file_cfg', 'key_conf', 'value_conf');

=head1 DESCRIPTION

L<Mojolicious::Plugin::CellbisEtc> is a L<Mojolicious> plugin to handler configure in etc.

=head1 METHODS

L<Mojolicious::Plugin::CellbisEtc> inherits all methods from
L<Mojolicious::Plugin> and implements the following new ones.

=head2 register

  $plugin->register(Mojolicious->new);

Register plugin in L<Mojolicious> application.

=head1 SEE ALSO

L<Mojolicious>, L<Mojolicious::Guides>, L<http://mojolicious.org>.

=cut