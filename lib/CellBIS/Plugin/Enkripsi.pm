package CellBIS::Plugin::Enkripsi;
use Mojo::Base 'Mojolicious::Plugin';

use Data::Dumper;
use CellBIS::enkripsi;
use Mojo::Util 'dumper';

our $VERSION = '0.1000';

sub register {
	my ($self, $app) = @_;

	$app->helper(cb_encoder => sub {
			my $mojo = shift;
			my $arg_len = scalar @_;
			my $secret = '';
			my $string = '';
			if ($arg_len == 1) {
				$string = $_[0];
			}
			if ($arg_len >= 2) {
				$secret = $_[0];
				$string = $_[1];
			}
			my $get_token_name = $mojo->cbcfg_token_name();
			my $token_akses = $mojo->cookie($get_token_name);
#			warn "Token Akses from plugin : \n $token_akses\n";
#			warn dumper $mojo->req->cookies->name($get_token_name);
#			warn $_->name for @{$mojo->req->cookies};

#			$secret = $secret if $secret ne '';
#			$secret = $token_akses if $secret eq '';
#			$secret = 'oqMpqWqqAqoMxqiDJxADCpMxMCJxIMRMWIMDIDIWqAFIAxFCMqIWCDxqqDEWqIoJFxpMJWWMxMqqMWBxoWqqFiIqWDDqIAxiBxWEEqxMIEiMpqARxpAEqEWIxxAI' if $secret eq '';

			$secret = $secret ne '' ? $secret :
					$mojo->cookie($get_token_name) ? $token_akses : 'oqMpqWqqAqoMxqiDJxADCpMxMCJxIMRMWIMDIDIWqAFIAxFCMqIWCDxqqDEWqIoJFxpMJW';
#			warn "Secret Plugin : $secret";

			my $getKey_enc = CellBIS::enkripsi->getKey_enc($secret);
			return CellBIS::enkripsi->Encoder($string, $getKey_enc);
		});
	$app->helper(cb_decoder => sub {
			my $mojo = shift;
			my $arg_len = scalar @_;
			my $secret = '';
			my $chiper = '';
			if ($arg_len == 1) {
				$chiper = $_[0];
			}
			if ($arg_len >= 2) {
				$secret = $_[0];
				$chiper = $_[1];
			}
			my $get_token_name = $mojo->cbcfg_token_name();
			my $token_akses = $mojo->cookie($get_token_name);
			$secret = $secret ne '' ? $secret :
					$mojo->cookie($get_token_name) ? $token_akses : 'oqMpqWqqAqoMxqiDJxADCpMxMCJxIMRMWIMDIDIWqAFIAxFCMqIWCDxqqDEWqIoJFxpMJW';

			my $getKey_enc = CellBIS::enkripsi->getKey_enc($secret);
			return CellBIS::enkripsi->Decoder($chiper, $getKey_enc);
		});
}
1;