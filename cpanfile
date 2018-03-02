requires "Carp" => "0";
requires "Config::INI::Reader" => "0";
requires "Config::INI::Writer" => "0";
requires "Crypt::JWT" => "0";
requires "Cwd" => "0";
requires "DBI" => "0";
requires "DBIx::Connector" => "0";
requires "Data::Dumper" => "0";
requires "DateTime" => "0";
requires "Digest::MD5" => "0";
requires "Exporter" => "0";
requires "File::Basename" => "0";
requires "File::ShareDir" => "0";
requires "File::Spec" => "0";
requires "File::Spec::Functions" => "0";
requires "Getopt::Long" => "0";
requires "Hash::Merge" => "0";
requires "Hash::MultiValue" => "0";
requires "JSON::XS" => "0";
requires "List::SomeUtils" => "0";
requires "List::Util" => "0";
requires "Log::Log4perl" => "0";
requires "MIME::Base64" => "0";
requires "Mojo::Asset::File" => "0";
requires "Mojo::Base" => "0";
requires "Mojo::ByteStream" => "0";
requires "Mojo::Cookie::Response" => "0";
requires "Mojo::DOM" => "0";
requires "Mojo::File" => "0";
requires "Mojo::JSON" => "0";
requires "Mojo::URL" => "0";
requires "Mojo::Util" => "0";
requires "Mojolicious" => "0";
requires "Pod::Simple::Search" => "0";
requires "Pod::Simple::XHTML" => "0";
requires "Scalar::Util" => "0";
requires "String::Random" => "0";
requires "String::Util" => "0";
requires "UI::Dialog" => "0";
requires "UI::Dialog::Backend::CDialog" => "0";
requires "UI::Dialog::Backend::Whiptail" => "0";
requires "base" => "0";
requires "strict" => "0";
requires "vars" => "0";
requires "warnings" => "0";

on 'build' => sub {
  requires "Module::Build" => "0.3601";
};

on 'configure' => sub {
  requires "ExtUtils::MakeMaker" => "0";
  requires "File::ShareDir::Install" => "0.06";
  requires "Module::Build" => "0.3601";
};

on 'develop' => sub {
  requires "Pod::Coverage::TrustPod" => "0";
  requires "Test::More" => "0";
  requires "Test::Pod" => "1.41";
  requires "Test::Pod::Coverage" => "1.08";
};
