#!\usr\bin\perl


# use this command in cli to remove extra white space in the html file.
# this is important for searching through html tags.
#   grep -P -v '^\s*$' small1.html > small1_edited.html
  

$filename = $ARGV[0];

# open the file given from command line arguments
open($file, $filename) or die "File won't open! correct format is: perl scraper.pl <html filename>\n";

@filelines = <$file>;

@vehicle;
@mpg;
@year;
@make;

for ($i = 0; $i < $#filelines; $i++) {

    $line = @filelines[$i];
    $line =~ s/^\s+//; # remove beginning whitespace

    $nameline = @filelines[$i+4];

    $mpgline = @filelines[$i+5];
    $mpgline =~ s/^\s+//;

    $mpgline20 = @filelines[$i+22];

    $mpgline16 = @filelines[$i+16];
    $mpgline16 =~ s/^\s+//;

    $mpgline54_hy = @filelines[$i+54];
    $mpgline54_hy =~ s/^\s+//;

    $mpgline13_hy = @filelines[$i+13];
    $mpgline13_hy =~ s/^\s+//;

    $mpgline_gas = @filelines[$i+22];
    $mpgline_gas =~ s/^\s+//;

    $mpgline_hybrid = @filelines[$i+60];
    $mpgline_hybrid =~ s/^\s+//;

    if (index($line, '<tbody>') != -1) {

        $nameline =~ s/^\s+//;
        $offset = index($nameline, '>');
        $vehicle_name = substr $nameline, $offset+1;
        $vehicle_name =~ s/^\s+|\s+$//; #remove trailing whitespace
        $vehicle_name = substr $vehicle_name, 0, -4; #remove html tail tag
        
        #print "$vehicle_name\n";

        @vehicle_props = split(/ /, $vehicle_name);
        $year = @vehicle_props[0];
        push @year, $year;
        $make = @vehicle_props[1];
        push @make, $make;
        $model = join(' ', @vehicle_props[2 .. $#vehicle_props]);
        push @model, $model;

        if (index($mpgline16, 'class="results"') != -1) {
            # print "$mpgline16"; # if line +16 is class="results" then gas car
            # case gas vehicle
            $offset_gas = index($mpgline_gas, '>');
            $mpg_gas_line = substr $mpgline_gas, $offset_gas+1;
            $mpg_gas_line =~ s/^\s+|\s+$//;
            $mpg_gas_line = substr $mpg_gas_line, 0, -5;

            push @mpg, $mpg_gas_line;

        } elsif (index($mpgline16, 'class="phev"') != -1) {
            # if the car only has a kwph and no mpg set mpg to -999
            push @mpg, "-999";

        } elsif (index($mpgline13_hy, 'class="mpg-epa"') != -1) {
            # case hybrid vehicle
            for ($k=$i; $k < $k+70; $k++) {
                $newline = @filelines[$k];
                #print "$newline";
                if (index($newline, 'class="fuel2"') != -1) {
                    $hybrid_mpg_line = @filelines[$k+10];
                    #print "$hybrid_mpg_line";
                    last;
                }
            }
            $offset_hybrid = index($hybrid_mpg_line, '>');
            $mpg_hybrid_line = substr $hybrid_mpg_line, $offset_hybrid+1;
            $mpg_hybrid_line =~ s/^\s+|\s+$//;
            $mpg_hybrid_line = substr $mpg_hybrid_line, 0, -5;
            #print "$mpg_hybrid_line\n";
            push @mpg, $mpg_hybrid_line;
        }
   }

}

@make = grep { $_ ne '' } @make;
@year = grep { $_ ne '' } @year;
@model = grep { $_ ne '' } @model;
@year = grep { $_ ne '</span'} @year;

#print "$#year\n";
#print "$#make\n";
#print "$#model\n";
#print "$#mpg\n";
#print "@year\n";

for ($i = 0; $i < $#year; $i++) {
    $vehicle = '{ "Year": ' . $year[$i] . ',' . ' "Make": ' . '"' . $make[$i] . '",' . ' "Model": ' . '"' . $model[$i] . '",' . ' "Mpg": ' . $mpg[$i] . " },\n";
    push @vehicle, $vehicle;
}

close($file);
print @vehicle;

$output_filename = "vehicle_data.json";
open(WRITEFILE, '>>', $output_filename) || die "Could not open writefile\n";

for ($i = 0; $i < $#vehicle; $i++) {
    print WRITEFILE $vehicle[$i];
}

close(WRITEFILE);
