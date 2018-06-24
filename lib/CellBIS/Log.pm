package CellBIS::Log;
$CellBIS::Log::VERSION = '0.1';
use Mojo::Base '-strict';

use Scalar::Util qw(looks_like_number blessed);
use Mojo::JSON 'j';
use Mojo::Util qw(dumper encode decode b64_encode b64_decode);

use Log::Log4perl;

use CellBIS::DBIO::Lite;
use CellBIS::Log::Config;

# ABSTRACT: Module for handle Log in Database.

# Database Handler :
# ------------------------------------------------------------------------
sub _dbHandler {
	my ($connector, $mojo) = @_;
	my $dbio;
#	say dumper \@_;
	if (blessed($mojo)) {
		$dbio = $mojo->dbioLite($connector);
	} else {
#		say "non blessed mojo";
		$dbio = CellBIS::DBIO::Lite->new($connector);
	}
	return $dbio;
}

# Constructor :
# ------------------------------------------------------------------------
sub new {
	my $class = shift;
	my $arg_len = scalar @_;
	my $self = {};
	if ($arg_len >= 5) {
		$self = {
			log_type => shift,
			connector => shift,
			table_cfg => shift,
			log_cfg => shift,
			mojo => shift,
			type => 'single',
		};
		$self->{dbio} = _dbHandler($self->{connector}, $self->{mojo});
	}

	if ($arg_len >= 4 and $arg_len < 5) {
		$self->{log_type} = $_[0];
		if ($self->{log_type} eq 'db') {
			$self = {
				log_type => $_[0],
				connector => $_[1],
				table_cfg => $_[2],
				log_cfg => $_[3],
				mojo => 'mojo',
				type => 'single',
			};
			$self->{dbio} = _dbHandler($self->{connector}, $self->{mojo});
		}
		if ($self->{log_type} eq 'file') {
			$self = {
				log_type => $_[0],
				log_format => $_[1],
				config_name => $_[2],
				filename => $_[3],
				type => 'single'
			}
		}
	}
	if ($arg_len == 2) {
		$self = {
			config => shift,
			mojo => shift,
			type => 'multi',
		};
	}
	if ($arg_len == 1) {
		$self = {
			mojo => shift,
			type => 'null',
		};
	}
	return bless $self, ref $class || $class;
}

############################################################################################
# FUNCTIONAL
############################################################################################

# Log Store :
# ------------------------------------------------------------------------
sub store {
	my $self = shift;
	die "[ Config Log is not found ]" unless exists $self->{config_log};

	my $config_log = $self->{config_log};
	Log::Log4perl::init( \$config_log );
	my $logger = Log::Log4perl->get_logger();
	$logger->info(@_);
}

# Log Initialization :
# ------------------------------------------------------------------------
sub init {
	my $self = shift;
	my $arg_len = scalar @_;
	my $type_init = $self->{type};
	my $params = {};
	my $log_cfg = {};

	# Check Type Init :
	if ($type_init eq 'multi') {
#		say "Type init : 'multi'";
		die "[ Method need argument name 'config' ]" if $arg_len == 0;

		if ($arg_len == 1) {
			my $cfg_name = $_[0];
			$params = $self->{config}->{$cfg_name};
		}
		if ($arg_len >= 2) {
			my $cfg_name = $_[0];
			$params = $self->{config}->{$cfg_name};
			$log_cfg = $_[1];
		}
	}

	# Need argument config to action :
	elsif ($type_init eq 'null') {
#		say "Type init : 'null'";
		die "[ Method need argument ]" unless $arg_len >= 1;
		my $cfg_name = $_[0];
		$params = $_[0];
		$log_cfg = $params->{log_cfg};
	}

	# Need argument config to action
	else {
#		say "Type init : 'single'";
		$params = $self;

		# Check argument input on subroutine :
		my $size_logcfg = 0;
		if ($arg_len >= 1) {
			$log_cfg = $_[0];
		} else {
			$log_cfg = $params->{log_cfg} if exists $params->{log_cfg};
			$size_logcfg = scalar keys %{$log_cfg};
		}
		die "[ Log Config is not found ]" if $size_logcfg == 0 and $params->{log_type} eq 'db';
	}

	my $log_type = $params->{log_type};
	my $config_log = '';

	if ($log_type eq 'db') {
		my $db_name = $params->{connector}->{db_config}->{db_name};
		my $table_name = $params->{table_cfg}->{name};
		my @table_config = @{$params->{table_cfg}->{config}};
		@table_config = shift(@table_config);
		my $for_tbl_field;
		my $for_tbl_value;

		# For 'Table Field' dan 'Table Value' :
		$for_tbl_field = $log_cfg->{table_field} if exists $log_cfg->{table_field};
		$for_tbl_value = $log_cfg->{table_value} if exists $log_cfg->{table_value};

		if (exists $log_cfg->{table_field} and !exists $log_cfg->{table_value}) {
			my @for_val = map { '?' } @table_config;
			$for_tbl_value = \@for_val;
		}

		unless (exists $log_cfg->{table_field}) {
			my @for_fld = map { $table_config[$_]->{name} } keys @table_config;
			$for_tbl_field = \@for_fld;
		}

		unless (exists $log_cfg->{table_value}) {
			my @for_val = map { '?' } @table_config;
			$for_tbl_value = \@for_val;
		}

		my $table_field = join ', ', @{$for_tbl_field};
		my $table_value = join ', ', @{$for_tbl_value};

		# For Params Insert data :
		my $config_name = $log_cfg->{config_name};
		my $forParam_insert = $log_cfg->{params};

		$config_log = CellBIS::Log::Config->db_log($config_name, $db_name, $table_name, $table_field, $table_value, $forParam_insert);
		$self->{config_log} = $config_log;
		return $self;
	}

	if ($log_type eq 'file') {
		my $filename = $params->{filename};
		my $config_name = $params->{config_name};
		my $log_format = $params->{log_format};

		$config_log = CellBIS::Log::Config->file_log($config_name, $filename, $log_format);
		$self->{config_log} = $config_log;
		return $self;
	}
}

# Validation table :
# ------------------------------------------------------------------------
sub table_val {
	my $self = shift;
	my %data = ('result' => 0);
	if ($self->check_table()) {
		$data{'result'} = 1;
	}
	return \%data;
}

# Validation table and execute if table is not exists :
# ------------------------------------------------------------------------
sub table_val_exec {
	my $self = shift;
	my %data = ('result' => 0);
	if ($self->check_table()) {
		$data{'result'} = 1;
	} else {
		my $create = $self->create_table();
		if ($create->{result} == 1) {
			$data{'data'} = $create->{'data'};
		} else {
			$data{'data'} = $create->{data};
		}
	}
	return \%data;
}

############################################################################################
# STORE
############################################################################################

# Check Table :
# ------------------------------------------------------------------------
sub check_table {
	my $self = shift;
	my $dbio = $self->{dbio};
	my $table_cfg = $self->{table_cfg};
	my $q_table = $dbio->table();
	return $q_table->check($table_cfg->{name});
}

# Create Table :
# ------------------------------------------------------------------------
sub create_table {
	my $self = shift;
	my $dbio = $self->{dbio};
	my $table_cfg = $self->{table_cfg};
	my $q_table = $dbio->table();

	die "[ Table name is not found ]" unless $table_cfg->{name};
	die "[ Table config is not found ]" unless $table_cfg->{config};

	if (exists $table_cfg->{config}) {
		my $table_name = $table_cfg->{name};
		my @data_tbl = @{$table_cfg->{config}};
		my @tbl_list = map { $data_tbl[$_]->{name} } keys @data_tbl;
		my %fld_data = map { $data_tbl[$_]->{name} => $data_tbl[$_] } keys @data_tbl;
		return $q_table->create(
			$table_name,
			\@tbl_list,
			\%fld_data
		);
	}
}

1;

=encoding utf8

=head1 NAME

CellBIS::Log - Module for File log Handle

=head1 DESCRIPTION

Module for handle log and store in database SQLite. The purpose of module
to give mechanism to communication with module L<Log::Log4perl>.

=head1 AUTHOR

Achmad Yusri Afandi, E<lt>yusrideb@cpan.orgE<gt>

=head1 COPYRIGHT AND LICENSE

Copyright (C) 2017 by Achmad Yusri Afandi

=cut