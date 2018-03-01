package CellBIS::enkripsi;
use strict;
use warnings FATAL => 'all';

use Data::Dumper;
use Carp ();
use Scalar::Util qw(blessed);
use List::SomeUtils qw(part);
use CellBIS::Utils::Char;

our $VERSION = '0.1000';

# Constructor :
# ------------------------------------------------------------------------
sub new {
  my $class = shift;
  my $self = {
    string => shift,
  };
  bless $self, $class;
  return $self;
}

# Encoder string :
# ------------------------------------------------------------------------
sub Encoder {
  # Define parameter subroutine :
  my ($self, $plain_text, $plankey) = @_;
  
  # Get NumLoop :
  my $num1 = $plankey->{'num1'};
  my $num11 = $num1 * 2;
  my $num2 = $plankey->{'num2'};
  my $num21 = $num2 * 2;
  my $key_enc = $plankey->{'key_enc'} + 3;
  
  # Convert string to array :
  my $r_pltxt = $self->random($plain_text, $num1, $num2, 2);
  my @arr_str = CellBIS::Utils::Char->split_blen($r_pltxt, 1);
  #    my @arr_str = unpack('(a1)*', $r_pltxt);
  
  # While loop to encoder Step 1 :
  my $i = 0;
  my $until = scalar keys(@arr_str);
  my @temp1 = ();
  my $pre1 = undef;
  while ($i < $until) {
    # Convert data array into decimal :
    $pre1 = ord $arr_str[$i];
    $pre1 = $pre1 + $key_enc;
    
    # Place result into array :
    $temp1[$i] = sprintf("%X", $pre1);
    
    # Auto Increment :
    $i++;
  }
  # print "Step 1 Encoder\n";
  # print Dumper \@temp1;
  # print "--- Batas ---\n";
  
  # While loop to encoder Step 2 :
  my @e1 = ('J', 'i', 'o', 'R', 'p', 'I', 'W', 'q', 'M', 'x');
  my %e2 = ("a" => "h", "b" => "j", "c" => "k", "d" => "v", "e" => "t", "f" => "n");
  my $i2 = 0;
  my $until2 = scalar keys(@temp1);
  my $temp2 = '';
  my @temp21 = ();
  my ($pre2, $pre21, $get_int);
  while ($i2 < $until2) {
    # Replace string :
    $pre2 = $temp1[$i2];
    if ($pre2 =~ /(\d)/) {
      $get_int = int $1;
      $pre2 =~ s/$1/$e1[$get_int]/g;
    }
    if ($pre2 =~ /(\d)/) {
      $get_int = int $1;
      $pre2 =~ s/$1/$e1[$get_int]/g;
    }
    $pre2 =~ s/a/$e2{"a"}/;
    $pre2 =~ s/b/$e2{"b"}/;
    $pre2 =~ s/c/$e2{"c"}/;
    $pre2 =~ s/d/$e2{"d"}/;
    $pre2 =~ s/e/$e2{"e"}/;
    $pre2 =~ s/f/$e2{"f"}/;
    $temp21[$i2] = $pre2;
    $temp2 .= $pre2;
    $i2++;
  }
  # print "Step 2 Encoder : \n";
  # print "$temp2\n";
  # print "--- Batas ---\n";
  
  # Final Random :
  my $data = $self->random($temp2, $num11, $num21, 2);
  
  # Return :
  return $data;
}

# Decoder string :
# ------------------------------------------------------------------------
sub Decoder {
  # Define parameter subroutine :
  my ($self, $chiper, $plankey) = @_;
  
  # Define scalar for place result :
  my $data = undef;
  
  # Get NumLoop :
  my $num1 = $plankey->{'num1'};
  my $num11 = $num1 * 2;
  my $num2 = $plankey->{'num2'};
  my $num21 = $num2 * 2;
  my $key_enc = $plankey->{'key_enc'} + 3;
  
  # Extract Final Random :
  my $chiper0 = $self->extract_random($chiper, $num11, $num21, 2);
  
  # While loop to decoder Step 1 :
  my %d1 = ('J' => "0", 'i' => "1", 'o' => "2", 'R' => "3", 'p' => "4", 'I' => "5", 'W' => "6", 'q' => "7", 'M' => "8",
    'x'         => "9");
  my @pre_chiper = CellBIS::Utils::Char->split_blen($chiper0, 1);
  my $i1 = 0;
  my $until1 = scalar keys(@pre_chiper);
  my @temp0 = ();
  my ($match_d1, $pre1_chiper);
  my $temp01 = '';
  my $pre1;
  while ($i1 < $until1) {
    $pre1_chiper = $pre_chiper[$i1];
    if (exists $d1{$pre1_chiper}) {
      $match_d1 = $d1{$pre1_chiper};
      $pre1_chiper =~ s/$pre1_chiper/$match_d1/;
    }
    $temp0[$i1] = $pre1_chiper;
    $temp01 .= $pre1_chiper;
    $i1++;
  }
  
  # print "Decoder Step 1\n";
  # print Dumper \@temp0;
  # print "--- Batas Step 1 ---\n";
  
  # While loop to decoder Step 2 :
  my %d2 = ("h" => "a", "j" => "b", "k" => "c", "v" => "d", "t" => "e", "n" => "f");
  my $i2 = 0;
  my $until2 = scalar keys(@temp0);
  my @temp1 = ();
  my ($match_dl1, $pre2_chiper);
  my $temp11 = '';
  while ($i2 < $until2) {
    $pre2_chiper = $temp0[$i2];
    if (exists $d2{$pre2_chiper}) {
      $match_dl1 = $d2{$pre2_chiper};
      $pre2_chiper =~ s/$pre2_chiper/$match_dl1/;
    }
    $temp1[$i2] = $pre2_chiper;
    $temp11 .= $pre2_chiper;
    $i2++;
  }
  
  # print "Decoder Step 2\n";
  # print Dumper \@temp1;
  # print "--- Batas Step 2 ---\n";
  
  # Convert $temp1 into array :
  my @arr_chiper = CellBIS::Utils::Char->split_blen($temp11, 2);
  
  # While loop to decoder Step 3 :
  my $i3 = 0;
  my $until3 = scalar keys(@arr_chiper);
  my $temp2 = '';
  my ($pre2, $pre3);
  my @temp21 = ();
  while ($i3 < $until3) {
    $pre2 = sprintf("%d", hex($arr_chiper[$i3]) - $key_enc);
    $pre3 = chr $pre2;
    $temp21[$i3] = $pre3;
    $temp2 .= $pre3;
    $i3++;
  }
  
  # print "Decoder Step 3\n";
  # print Dumper $temp2;
  # print "--- Batas Step 3 ---\n";
  
  # Extract Loop :
  $data = $self->extract_random($temp2, $num1, $num2, 2);
  # $data = $temp2;
  
  # Return result :
  return $data;
}

# create random :
# ------------------------------------------------------------------------
sub random {
  # Define parameter subroutine :
  my ($self, $string, $c_odd2even, $c_even2odd, $nested) = @_;
  
  # Define scalar for place result :
  my $data = undef;
  
  # Prepare Stirng :
  my $len_str = length $string;
  my $str = '';
  
  # Check String, Jika angka genap.
  if (($len_str % 2) == 0) {
    $str = $string;
  }
  # Check String, jika angka ganjil
  else {
    $str = $string . '|';
  }
  
  # Action Random :
  $data = $self->rand_odd2even($str, $c_odd2even, $c_even2odd, $nested);
  
  # Return :
  return $data;
}

# extract random :
# ------------------------------------------------------------------------
sub extract_random {
  # Define parameter subroutine :
  my ($self, $string, $c_odd2even, $c_even2odd, $nested) = @_;
  
  # Define scalar for place result :
  my $data = undef;
  
  # Action Extract Random String :
  my $extract = $self->unrand_odd2even($string, $c_odd2even, $c_even2odd, $nested);
  
  # Filter Result :
  $extract =~ s/\|$//g;
  
  # Return result :
  return $extract
}

# for Get Encryption :
# ------------------------------------------------------------------------
sub getKey_enc {
  # Define parameter subroutine :
  my ($self, $string) = @_;
  
  # Define scalar for place result :
  my %data = ();
  
  # Define scalar to prepare get Key Enc :
  my @arrStr = CellBIS::Utils::Char->split_blen($string, 1);
  
  # While loop to get key enc - Step 1 :
  my $i = 0;
  my $len_arr = scalar @arrStr;
  my $temp1 = 0;
  my $decimal;
  while ($i < $len_arr) {
    $decimal = ord $arrStr[$i];
    $temp1 = int $decimal + $temp1;
    $i++;
  }
  
  # While loop to get key enc - Step 2 :
  my $ip = 1;
  my $temp2 = $temp1;
  while ($i < $temp1) {
    $temp2 = $temp2 / 2;
    if ($temp2 > 10 and $temp2 < 50) {
      $temp2 = $temp2;
      last;
    }
    $ip++;
  }
  
  # get Key enc - Final :
  my @getNum = CellBIS::Utils::Char->split_blen($temp2, 1);
  my $num1 = $getNum[0];
  my $num2 = $getNum[1];
  my $key_enc = int $temp2;
  $data{num1} = $num1;
  $data{num2} = $num2;
  $data{key_enc} = $key_enc;
  
  # Return result :
  return \%data;
}

# Loop Acak dari Ganjil genap ke genap Ganjil :
# ------------------------------------------------------------------------
sub rand_odd2even {
  my $self = shift;
  my $arg_len = scalar @_;
  my $string = '';
  my $count_odd = 0;
  my $count_even = 0;
  my $nested = 0;
  Carp::croak(q{Arguments is less than 3 or 4})
    unless $arg_len == 3 or $arg_len >= 4;
  
  if (blessed($self)) {
    $string = $self->{string};
    if ($arg_len >= 3) {
      $count_odd = $_[0];
      $count_even = $_[1];
      $nested = $_[2];
    }
  }
  else {
    if ($arg_len >= 4) {
      $string = $_[0];
      $count_odd = $_[1];
      $count_even = $_[2];
      $nested = $_[3];
    }
  }
  
  # print Dumper \@_;
  
  my $result = $string;
  my $i = 0;
  
  # For Nested loop == 1 :
  if ($nested == 1) {
    if ($count_odd != 0 and $count_even != 0) {
      $i = 0;
      while ($i < $count_odd) {
        $result = $self->_union_odd_even($string);
        $i++;
      }
    }
    if ($count_odd != 0 and $count_even == 0) {
      $i = 0;
      while ($i < $count_even) {
        $result = $self->_union_even_odd($string);
        $i++;
      }
    }
  }
  
  # For Nested loop == 2 :
  elsif ($nested == 2) {
    if ($count_odd != 0 and $count_even != 0) {
      # $i = 0;
      for ($i = 0; $i < $count_odd; $i++) {
        $result = $self->_union_odd_even($string);
        $result = $self->loop_union_for_odd_even($count_even, $result, 'even_odd');
      }
    }
    if ($count_odd != 0 and $count_even == 0) {
      $i = 0;
      while ($i < $count_odd) {
        $result = $self->_union_odd_even($string);
        $i++;
      }
    }
    if ($count_odd == 0 and $count_even != 0) {
      $i = 0;
      while ($i < $count_odd) {
        $result = $self->_union_even_odd($string);
        $i++;
      }
    }
  }
  
  # For Nested loop == 0 :
  else {
    if ($count_odd != 0 and $count_even != 0) {
      $i = 0;
      my $result1 = $self->loop_union_for_odd_even($count_odd, $result, 'odd_even');
      $result = $self->loop_union_for_odd_even($count_even, $result1, 'even_odd');
    }
    if ($count_odd != 0 and $count_even == 0) {
      $i = 0;
      $result = $self->loop_union_for_odd_even($count_odd, $result, 'odd_even');
      # print "Hasil 1 = $result\n";
    }
    if ($count_odd == 0 and $count_even != 0) {
      $i = 0;
      $result = $self->loop_union_for_odd_even($count_even, $result, 'even_odd');
      # print "Hasil 1 = $result\n";
    }
  }
  return $result;
}

# Extract Acak dari Ganjil genap ke genap Ganjil :
# ------------------------------------------------------------------------
sub unrand_odd2even {
  my $self = shift;
  my $arg_len = scalar @_;
  my $string = '';
  my $count_odd = 0;
  my $count_even = 0;
  my $nested = 0;
  Carp::croak(q{Arguments is less than 3 or 4})
    unless $arg_len == 3 or $arg_len >= 4;
  
  if (blessed($self)) {
    $string = $self->{string};
    if ($arg_len >= 3) {
      $count_odd = $_[0];
      $count_even = $_[1];
      $nested = $_[2];
    }
  }
  else {
    if ($arg_len >= 4) {
      $string = $_[0];
      $count_odd = $_[1];
      $count_even = $_[2];
      $nested = $_[3];
    }
  }
  
  # print Dumper \@_;
  
  my $result = $string;
  my $i = 0;
  
  # For Nested loop == 1 :
  if ($nested == 1) {
    if ($count_odd != 0 and $count_even != 0) {
      $i = 0;
      while ($i < $count_odd) {
        $result = $self->_reverse_union_odd_even($string);
        $i++;
      }
    }
    if ($count_odd != 0 and $count_even == 0) {
      $i = 0;
      while ($i < $count_even) {
        $result = $self->_reverse_union_even_odd($string);
        $i++;
      }
    }
  }
  
  # For Nested loop == 2 :
  elsif ($nested == 2) {
    if ($count_odd != 0 and $count_even != 0) {
      # $i = 0;
      for ($i = 0; $i < $count_odd; $i++) {
        $result = $self->reverse_loop_union_for_odd_even($count_even, $string, 'even_odd');
        $result = $self->_reverse_union_odd_even($result);
      }
    }
    if ($count_odd != 0 and $count_even == 0) {
      $i = 0;
      while ($i < $count_odd) {
        $result = $self->_reverse_union_odd_even($string);
        $i++;
      }
    }
    if ($count_odd == 0 and $count_even != 0) {
      $i = 0;
      while ($i < $count_odd) {
        $result = $self->_reverse_union_even_odd($string);
        $i++;
      }
    }
  }
  
  # For Nested loop == 0 :
  else {
    if ($count_odd != 0 and $count_even != 0) {
      my $result1 = $self->reverse_loop_union_for_odd_even($count_even, $result, 'even_odd');
      # print "Hasil urand 1 = $result1\n";
      $result = $self->reverse_loop_union_for_odd_even($count_odd, $result1, 'odd_even');
      # print "Hasil urand 2 = $result\n";
    }
    if ($count_odd != 0 and $count_even == 0) {
      $i = 0;
      $result = $self->reverse_loop_union_for_odd_even($count_odd, $string, 'odd_even');
      # print "Hasil 1 = $result\n";
    }
    if ($count_odd == 0 and $count_even != 0) {
      $i = 0;
      $result = $self->reverse_loop_union_for_odd_even($count_even, $string, 'even_odd');
      # print "Hasil 1 = $result\n";
    }
  }
  return $result;
}

#############################################################################################
# UTILITIES :
#############################################################################################

# For action loop "Union odd char and even char :
# ------------------------------------------------------------------------
sub loop_union_for_odd_even {
  my ($self, $count_loop, $string, $type) = @_;
  my $result = $string;
  my $i = 0;
  
  if ($type eq 'odd_even') {
    while ($i < $count_loop) {
      $result = $self->_union_odd_even($result);
      # print "part rand $i = $result\n";
      $i++;
    }
  }
  if ($type eq 'even_odd') {
    while ($i < $count_loop) {
      $result = $self->_union_even_odd($result);
      # print "part rand $i = $result\n";
      $i++;
    }
  }
  
  return $result;
}

# For action loop Reverse "Union odd char and even char" :
# ------------------------------------------------------------------------
sub reverse_loop_union_for_odd_even {
  my ($self, $count_loop, $string, $type) = @_;
  
  my $result = $string;
  my $i = 0;
  
  if ($type eq 'odd_even') {
    while ($i < $count_loop) {
      $result = $self->_reverse_union_odd_even($result);
      # print "part reverse rand $i = $result\n";
      $i++;
    }
  }
  if ($type eq 'even_odd') {
    while ($i < $count_loop) {
      $result = $self->_reverse_union_even_odd($result);
      # print "part reserver rand $i = $result\n";
      $i++;
    }
  }
  
  return $result;
}

# For reverse union odd char and even char :
# ------------------------------------------------------------------------
sub _reverse_union_odd_even {
  my ($self, $string) = @_;
  
  # print "\n";
  # print "For reverse odd even : \n";
  
  # my $get_odd = $self->_odd_even_char('odd', $string);
  # my $get_even = $self->_odd_even_char('even', $string);
  my @arr_str = CellBIS::Utils::Char->split_blen($string, 1);
  my $i = 0;
  my ($even, $odd) = part {$i++ % 2} @arr_str;
  my $str_odd = join '', @{$odd};
  my $str_even = join '', @{$even};
  my $len_odd = length $str_odd;
  my $len_even = length $str_even;
  my $for_odd = substr $string, 0, $len_odd;
  my $for_even = substr $string, $len_odd, $len_even;
  my @arr_even = CellBIS::Utils::Char->split_blen($for_even, 1);
  my @arr_odd = CellBIS::Utils::Char->split_blen($for_odd, 1);
  my $result = '';
  
  if ($len_even > $len_odd) {
    # print "For even = $len_even > odd = $len_odd \n";
    # print "Data Odd = $for_odd\n";
    # print "Data Even = $for_even\n";
    $i = 0;
    while ($i < $len_even) {
      $result .= $arr_even[$i] if exists $arr_even[$i];
      $result .= $arr_odd[$i] if exists $arr_odd[$i];
      $i++;
    }
    # print "loop reverse 1 - oddeven1 : $result\n";
  }
  if ($len_even == $len_odd) {
    # print "For $len_even == $len_odd \n";
    # print "Data Odd = $for_odd\n";
    # print "Data Even = $for_even\n";
    $i = 0;
    while ($i < $len_odd) {
      $result .= $arr_even[$i] if exists $arr_even[$i];
      $result .= $arr_odd[$i] if exists $arr_odd[$i];
      $i++;
    }
    # print "loop reverse 2 - oddeven1: $result\n";
  }
  return $result;
}

# For reverse union even char and odd char :
# ------------------------------------------------------------------------
sub _reverse_union_even_odd {
  my ($self, $string) = @_;
  
  # print "\n";
  # print "For reverse even odd : \n";
  
  my @arr_str = CellBIS::Utils::Char->split_blen($string, 1);
  my $i = 0;
  my ($even, $odd) = part {$i++ % 2} @arr_str;
  my $str_even = join '', @{$even};
  my $str_odd = join '', @{$odd};
  my $len_even = length $str_even;
  my $len_odd = length $str_odd;
  my $for_even = substr $string, 0, $len_even;
  my $for_odd = substr $string, $len_even, $len_odd;
  my @arr_even = CellBIS::Utils::Char->split_blen($for_even, 1);
  my @arr_odd = CellBIS::Utils::Char->split_blen($for_odd, 1);
  my $result = '';
  if ($len_even > $len_odd) {
    # print "For $len_even > $len_odd \n";
    # print "Data Odd = $for_odd\n";
    # print "Data Even = $for_even\n";
    $i = 0;
    while ($i < $len_even) {
      $result .= $arr_even[$i] if exists $arr_even[$i];
      $result .= $arr_odd[$i] if exists $arr_odd[$i];
      $i++;
    }
    # print "loop reverse 1 - evenodd : $result\n";
  }
  if ($len_even == $len_odd) {
    # print "For $len_even == $len_odd \n";
    # print "Data Odd = $for_odd\n";
    # print "Data Even = $for_even\n";
    $i = 0;
    while ($i < $len_odd) {
      $result .= $arr_even[$i] if exists $arr_even[$i];
      $result .= $arr_odd[$i] if exists $arr_odd[$i];
      $i++;
    }
    # print "loop reverse 2 - evenodd: $result\n";
  }
  return $result;
}

# For union odd char and even char :
# ------------------------------------------------------------------------
sub _union_odd_even {
  my ($self, $string) = @_;
  
  my $odd_char = $self->_odd_even_char('odd', $string);
  my $even_char = $self->_odd_even_char('even', $string);
  
  # print "\n";
  # print "for _union_odd_even :\n";
  # print "Hasil odd : $odd_char\n";
  # print "Hasil even : $even_char\n";
  
  return $odd_char . $even_char;
}

# For union even char and odd char :
# ------------------------------------------------------------------------
sub _union_even_odd {
  my ($self, $string) = @_;
  
  my $even_char = $self->_odd_even_char('even', $string);
  my $odd_char = $self->_odd_even_char('odd', $string);
  
  # print "\n";
  # print "for _union_even_odd :\n";
  # print "Hasil even : $even_char\n";
  # print "Hasil odd : $odd_char\n";
  
  return $even_char . $odd_char;
}

# Get Odd character :
# ------------------------------------------------------------------------
sub _odd_even_char {
  my ($self, $type, $string) = @_;
  my $data = '';
  
  my @arr_str = CellBIS::Utils::Char->split_blen($string, 1);
  
  my @result = ();
  my @pre_data = ();
  my @pre_data1 = ();
  my @data = ();
  if ($type eq 'odd') {
    @result = grep {$_ % 2 == 1} keys @arr_str;
    @pre_data1 = map {$pre_data[$_] => $arr_str[$result[$_]]} keys @result;
    @data = grep(defined, @pre_data1);
  }
  if ($type eq 'even') {
    @result = grep {$_ % 2 == 0} keys @arr_str;
    @pre_data1 = map {$pre_data[$_] => $arr_str[$result[$_]]} keys @result;
    @data = grep(defined, @pre_data1);
  }
  $data = join '', @data;
  # print "Hasil get char $type = $data\n";
  return $data;
}

1;
__END__

=head1 NAME

CellBIS::enkripsi - Module for encryption.

=head1 SYNOPSIS



=head1 DESCRIPTION



=head1 AUTHORS



=head1 COPYRIGHT AND LICENSE


