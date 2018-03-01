package CellBIS::Utils::File;
use strict;
use warnings FATAL => 'all';

# Version :
our $VERSION = '0.1000';

# Subroutine for read file dir :
# ------------------------------------------------------------------------
sub read_dir {
	my ($self, $loc_dir) = @_;

    opendir(my $dh, $loc_dir) || die "Can't opendir $loc_dir: $!";
    my @listDir = grep { !/^\./ && -d "$loc_dir/$_" } readdir($dh);
    closedir $dh;
    return @listDir;
}

# Subroutine for list dir tree :
# ------------------------------------------------------------------------
sub read_dirTree {
	my ($self, $loc_dir) = @_;
    my %data = ();
    my @r_list = ();
    my @dir_list = ();
    my @file_list = ();

    my @files = $self->read_dir($loc_dir);

    @files = map { $loc_dir . '/' . $_ } @files;
    for (@files) {
        push @r_list, $_;
        if (-d $_) {
            push @dir_list, $_;
            $self->read_dirTree($_);
        } else {
            push @file_list, $_;
        }
    }
    $data{'result'} = \@r_list;
    $data{'dir'} = \@dir_list;
    $data{'file'} = \@file_list;
    return \%data;
}

# Create Subroutine for Read Files :
# ------------------------------------------------------------------------
sub read {
    my ($self, $loc_files) = @_;
    my $data = '';

    open(FH, '<', $loc_files) or die $! . " - " . $loc_files;

    while (my $lines = <FH>) {
        chomp $lines;
        $data .= $lines;
    }
    close (FH);
    return $data;
}

# Subroutine for Create New File :
# ------------------------------------------------------------
sub create {
    my ($self, $filename, $destination, $isi_file) = @_;
    my $loc_files = $destination . $filename;
    my %data;

    open(FILE, '>', $loc_files) or die "File : $loc_files is not exists $!";
    print FILE $isi_file;
    close(FILE);

    if (-e $loc_files) {
        $data{'result'} = {
            'sukses' => 1,
            'data' => {
                'dirloc' => $destination,
                'filename' => $filename,
                'fileloc' => $loc_files
            }
        };
    } else {
        $data{'result'} = {
            'sukses' => 0,
            'data' => {
                'dirloc' => $destination,
                'filename' => $filename,
                'fileloc' => $loc_files
            }
        };
    }
    return \%data;
}
1;