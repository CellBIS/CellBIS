package Mojolicious::Plugin::CellbisLog;
$Mojolicious::Plugin::CellbisLog::VERSION = '0.1';
use Mojo::Base 'Mojolicious::Plugin';

# ABSTRACT: CellBIS Toolkit for handle Log Application based on Mojolicious Plugin

use CellBIS::Log;

sub register {
	my $plugin = shift;
	my $arg_len = scalar @_;
	my $app = '';
	my $config = '';
	my $config_size = 0;
	if ($arg_len == 1) {
		$app = $_[0];
	}

	if ($arg_len >= 2) {
		$app = $_[0];
		if (ref($_[1]) eq "ARRAY") {
			$config_size = scalar @{$_[1]};
			unless ($config_size == 0) {
				$config = $_[1];
			}
		}
	}

	$app->helper(cb_log_db => sub {
	    my $mojo = shift;
			if ($config_size != 0) {
				return CellBIS::Log->new(@{$config});
			}
			return CellBIS::Log->new(@_);
	});

	$app->helper(cb_log_file => sub {
	    my $mojo = shift;
			if ($config_size != 0) {
				return CellBIS::Log->new(@{$config});
			}
			return CellBIS::Log->new(@_);
	});
}

1;
