package CellBIS::Module_test;
use Mojo::Base -base;

use Scalar::Util qw(blessed);
use Mojo::Util qw(dumper);

# ABSTRACT: 
our $VERSION = '0.1000';

sub check_isa {
	my ($self, $subname) = @_;
	if (__PACKAGE__->can($subname)) {
		say "You can use subroutine 'sub1'";
		if ($self eq __PACKAGE__) {
			say "Blessed name ", __PACKAGE__;
		}
	} else {
		say "You can't use subroutine 'sub1'";
	}
}

sub sub1 {
	my ($self) = @_;
	say 'sub1';
}

sub sub2 {
	my ($self) = @_;
	say 'sub2';
}

sub sub3 {
	my ($self) = @_;
	say 'sub3';
}

sub sub4 {
	my ($self) = @_;
	say 'sub4';
}
1;