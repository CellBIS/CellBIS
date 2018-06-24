package CellBIS::Utils::ArrHash;
$CellBIS::Utils::ArrHash::VERSION = '0.1';
use strict;
use warnings FATAL => 'all';

# Import Module :
use List::Util qw( min max );

# Subroutine for Key Hash to Array :
# ------------------------------------------------------------------------
sub Hashkey_toArr {
	my ($self, $hashref) = @_;
    my %hash = %{$hashref};
    my @arr = map { $_ } keys %hash;
    return @arr;
}

# Subroutine for get only numberic on Key Hash :
# ------------------------------------------------------------------------
sub HashKey_numToArr {
    my ($self, $hashref) = @_;
    my %hash = %{$hashref};
    my @arr = map { $_ } keys %hash;
    @arr = grep { $_ =~ s/^([A-Za-z\_]+)([0-9])/$2/g } @arr;
    return \@arr;
}

# Subroutine for min max value of array :
# ------------------------------------------------------------------------
sub Arr_minMax_val {
    my ($self, $dataArr, $type) = @_;
    my @data = @{$dataArr};
    my $r = 0;
    if ($type eq 'min') { $r = min(@data); }
    if ($type eq 'max') { $r = max(@data); }
    return $r;
}
1;