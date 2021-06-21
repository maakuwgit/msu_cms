<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CountriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('countries')->insert([
            'name' => 'Algeria',
            'slug' => 'algeria',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Angola',
            'slug' => 'angola',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Afghanistan',
            'slug' => 'afghanistan',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Albania',
            'slug' => 'albania',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Andorra',
            'slug' => 'andorra',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Antigua and Barbuda',
            'slug' => 'antigua-and-barbuda',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 6
        ]);
        DB::table('countries')->insert([
            'name' => 'Argentina',
            'slug' => 'argentina',
            'code' => 'https://broad.msu.edu/education-abroad/programs/?term%5B%27term%27%5D=All&subject%5B%27subject%27%5D=All&program%5B%27program%27%5D=All&region%5B%27region%27%5D=All&country%5B1473%5D=1473&filterType=OR&submit=Submit', 
            'color' => rand(4,10), 
            'enabled' => 'on', 
            'continent_id' => 7
        ]);
        DB::table('countries')->insert([
            'name' => 'Armenia',
            'slug' => 'armenia',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Australia',
            'slug' => 'australia',
            'code' => 'https://broad.msu.edu/education-abroad/programs/?term%5B%27term%27%5D=All&subject%5B%27subject%27%5D=All&program%5B%27program%27%5D=All&region%5B%27region%27%5D=All&country%5B1474%5D=1474&filterType=OR&submit=Submit', 
            'color' => rand(4,10), 
            'enabled' => 'on', 
            'continent_id' => 4
        ]);
        DB::table('countries')->insert([
            'name' => 'Austria',
            'slug' => 'austria', 
            'code' => '',
            'color' => rand(4,10), 
            'enabled' => 'on', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Azerbaijan',
            'slug' => 'azerbaijan',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Bahamas',
            'slug' => 'bahamas',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 6
        ]);
        DB::table('countries')->insert([
            'name' => 'Bahrain',
            'slug' => 'bahrain',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Bangladesh',
            'slug' => 'bangladesh',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Barbados',
            'slug' => 'barbados',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 6
        ]);
        DB::table('countries')->insert([
            'name' => 'Belarus',
            'slug' => 'belarus',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Belgium',
            'slug' => 'belgium', 
            'code' => 'https://broad.msu.edu/education-abroad/programs/?term%5B%27term%27%5D=All&subject%5B%27subject%27%5D=All&program%5B%27program%27%5D=All&region%5B%27region%27%5D=All&country%5B1475%5D=1475&filterType=OR&submit=Submit',
            'color' => rand(4,10), 
            'enabled' => 'on', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Belize',
            'slug' => 'belize',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 6
        ]);
        DB::table('countries')->insert([
            'name' => 'Benin',
            'slug' => 'benin',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Bhutan',
            'slug' => 'bhutan',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Bolivia',
            'slug' => 'bolivia',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 7
        ]);
        DB::table('countries')->insert([
            'name' => 'Bosnia and Herzegovina',
            'slug' => 'bosnia-and-herzegovina',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Botswana',
            'slug' => 'botswana',
            'enabled' => 'off', 
            'color' => rand(4,10),'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Brazil',
            'slug' => 'brazil', 
            'code' => 'https://broad.msu.edu/education-abroad/programs/?term%5B%27term%27%5D=All&subject%5B%27subject%27%5D=All&program%5B%27program%27%5D=All&region%5B%27region%27%5D=All&country%5B1476%5D=1476&filterType=OR&submit=Submit', 
            'color' => rand(4,10), 
            'enabled' => 'on', 
            'continent_id' => 7
        ]);
        DB::table('countries')->insert([
            'name' => 'Brunei',
            'slug' => 'brunei',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Bulgaria',
            'slug' => 'bulgaria',
            'color' => rand(4,10),
            'enabled' => 'off',  
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Burkina Faso',
            'slug' => 'burkina-faso',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Burma (Myanmar)',
            'slug' => 'burma',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Burundi',
            'slug' => 'burundi',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Cambodia',
            'slug' => 'cambodia',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Cameroon',
            'slug' => 'cameroon',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Canada',
            'slug' => 'canada',
            'code' => 'https://broad.msu.edu/education-abroad/programs/?term%5B%27term%27%5D=All&subject%5B%27subject%27%5D=All&program%5B%27program%27%5D=All&region%5B%27region%27%5D=All&country%5B1477%5D=1477&filterType=OR&submit=Submit', 
            'color' => rand(4,10), 
            'enabled' => 'on', 
            'continent_id' => 6
        ]);
        DB::table('countries')->insert([
            'name' => 'Cape Verde',
            'slug' => 'cape-verde',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Central African Republic',
            'slug' => 'central-african-republic',
            'enabled' => 'off', 
            'color' => rand(4,10), 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Chad',
            'slug' => 'chad',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Chile',
            'slug' => 'chile',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 7
        ]);
        DB::table('countries')->insert([
            'name' => 'China',
            'slug' => 'china', 
            'code' => 'https://broad.msu.edu/education-abroad/programs/?term%5B%27term%27%5D=All&subject%5B%27subject%27%5D=All&program%5B%27program%27%5D=All&region%5B%27region%27%5D=All&country%5B1478%5D=1478&filterType=OR&submit=Submit',
            'color' => rand(4,10), 
            'enabled' => 'on', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Colombia',
            'slug' => 'colombia',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 7
        ]);
        DB::table('countries')->insert([
            'name' => 'Comoros',
            'slug' => 'comoros',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Congo',
            'slug' => 'congo',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Congo, Democratic Republic of',
            'slug' => 'congo-democratic-republic-of',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Costa Rica',
            'slug' => 'costa-rica',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 6
        ]);
        DB::table('countries')->insert([
            'name' => 'Croatia',
            'slug' => 'croatia',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Cuba',
            'slug' => 'cuba',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 6
        ]);
        DB::table('countries')->insert([
            'name' => 'Cyprus',
            'slug' => 'cyprus',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Czech Republic',
            'slug' => 'czech-republic',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Denmark',
            'slug' => 'denmark',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Djibouti',
            'slug' => 'djibouti',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Dominica',
            'slug' => 'dominica',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 6
        ]);
        DB::table('countries')->insert([
            'name' => 'Dominican Republic',
            'slug' => 'dominican-republic',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 6
        ]);
        DB::table('countries')->insert([
            'name' => 'East Timor',
            'slug' => 'east-timor',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Ecuador',
            'slug' => 'ecuador',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 7
        ]);
        DB::table('countries')->insert([
            'name' => 'Egypt',
            'slug' => 'egypt',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'El Salvador',
            'slug' => 'el-salvador',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 6
        ]);
        DB::table('countries')->insert([
            'name' => 'Equatorial Guinea',
            'slug' => 'equatorial-guinea',
            'enabled' => 'off', 
            'color' => rand(4,10), 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Eritrea',
            'slug' => 'eritrea',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Estonia',
            'slug' => 'estonia',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Ethiopia',
            'slug' => 'ethiopia',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Fiji',
            'slug' => 'fiji',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 4
        ]);
        DB::table('countries')->insert([
            'name' => 'Finland',
            'slug' => 'finland',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'France',
            'slug' => 'france', 
            'code' => '',
            'color' => rand(4,10), 
            'enabled' => 'on', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Gabon',
            'slug' => 'gabon',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Gambia',
            'slug' => 'gambia',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Georgia',
            'slug' => 'georgia',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Germany',
            'slug' => 'germany', 
            'code' => '',
            'color' => rand(4,10), 
            'enabled' => 'on', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Ghana',
            'slug' => 'ghana',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Greece',
            'slug' => 'greece', 
            'code' => 'https://broad.msu.edu/education-abroad/programs/?term%5B%27term%27%5D=All&subject%5B%27subject%27%5D=All&program%5B%27program%27%5D=All&region%5B%27region%27%5D=All&country%5B1481%5D=1481&filterType=OR&submit=Submit',
            'color' => rand(4,10), 
            'enabled' => 'on', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Grenada',
            'slug' => 'grenada',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 6
        ]);
        DB::table('countries')->insert([
            'name' => 'Guatemala',
            'slug' => 'guatemala',
            'code' => 'https://broad.msu.edu/education-abroad/programs/?term%5B%27term%27%5D=All&subject%5B%27subject%27%5D=All&program%5B%27program%27%5D=All&region%5B%27region%27%5D=All&country%5B1482%5D=1482&filterType=OR&submit=Submit', 
            'color' => rand(4,10), 
            'enabled' => 'on', 
            'continent_id' => 6
        ]);
        DB::table('countries')->insert([
            'name' => 'Guinea',
            'slug' => 'guinea',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Guinea-Bissau',
            'slug' => 'guinea-bissau',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Guyana',
            'slug' => 'guyana',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 7
        ]);
        DB::table('countries')->insert([
            'name' => 'Haiti',
            'slug' => 'haiti',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 6
        ]);
        DB::table('countries')->insert([
            'name' => 'Honduras',
            'slug' => 'honduras',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 6
        ]);
        DB::table('countries')->insert([
            'name' => 'Hungary',
            'slug' => 'hungary', 
            'code' => 'https://broad.msu.edu/education-abroad/programs/?term%5B%27term%27%5D=All&subject%5B%27subject%27%5D=All&program%5B%27program%27%5D=All&region%5B%27region%27%5D=All&country%5B1483%5D=1483&filterType=OR&submit=Submit',
            'color' => rand(4,10), 
            'enabled' => 'on', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Iceland',
            'slug' => 'iceland',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'India',
            'slug' => 'india', 
            'code' => 'https://broad.msu.edu/education-abroad/programs/?term%5B%27term%27%5D=All&subject%5B%27subject%27%5D=All&program%5B%27program%27%5D=All&region%5B%27region%27%5D=All&country%5B1484%5D=1484&filterType=OR&submit=Submit',
            'color' => rand(4,10), 
            'enabled' => 'on', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Indonesia',
            'slug' => 'indonesia',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Iran',
            'slug' => 'iran',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Iraq',
            'slug' => 'iraq',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Ireland',
            'slug' => 'ireland',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Israel',
            'slug' => 'israel', 
            'code' => 'https://broad.msu.edu/education-abroad/programs/?term%5B%27term%27%5D=All&subject%5B%27subject%27%5D=All&program%5B%27program%27%5D=All&region%5B%27region%27%5D=All&country%5B1485%5D=1485&filterType=OR&submit=Submit', 
            'color' => rand(4,10), 
            'enabled' => 'on', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Ivory Coast',
            'slug' => 'cote-d-ivoire',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Italy',
            'slug' => 'italy', 
            'code' => 'https://broad.msu.edu/education-abroad/programs/?term%5B%27term%27%5D=All&subject%5B%27subject%27%5D=All&program%5B%27program%27%5D=All&region%5B%27region%27%5D=All&country%5B1486%5D=1486&filterType=OR&submit=Submit',
            'color' => rand(4,10), 
            'enabled' => 'on', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Jamaica',
            'slug' => 'jamaica',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 6
        ]);
        DB::table('countries')->insert([
            'name' => 'Japan',
            'slug' => 'japan', 
            'code' => 'https://broad.msu.edu/education-abroad/programs/?term%5B%27term%27%5D=All&subject%5B%27subject%27%5D=All&program%5B%27program%27%5D=All&region%5B%27region%27%5D=All&country%5B1487%5D=1487&filterType=OR&submit=Submit',
            'color' => rand(4,10), 
            'enabled' => 'on', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Jordan',
            'slug' => 'jordan',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Kazakhstan',
            'slug' => 'kazakhstan',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Kenya',
            'slug' => 'kenya',
            'color' => rand(4,10), 
            'enabled' => 'off',     
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Kiribati',
            'slug' => 'kiribati',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 4
        ]);
        DB::table('countries')->insert([
            'name' => 'Korea, North',
            'slug' => 'korea-north',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Korea, South',
            'slug' => 'korea-south',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Kuwait',
            'slug' => 'kuwait',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Kyrgyzstan',
            'slug' => 'kyrgyzstan',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Laos',
            'slug' => 'laos',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Latvia',
            'slug' => 'latvia',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Lebanon',
            'slug' => 'lebanon',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Lesotho',
            'slug' => 'lesotho',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Liberia',
            'slug' => 'liberia',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Libya',
            'slug' => 'libya',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Liechtenstein',
            'slug' => 'liechtenstein',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Lithuania',
            'slug' => 'lithuania',
            'color' => rand(4,10),
            'enabled' => 'off',  
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Luxembourg',
            'slug' => 'luxembourg',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Macedonia',
            'slug' => 'macedonia',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Madagascar',
            'slug' => 'madagascar',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Malawi',
            'slug' => 'malawi',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Malaysia',
            'slug' => 'malaysia', 
            'code' => '',
            'color' => rand(4,10), 
            'enabled' => 'on', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Maldives',
            'slug' => 'maldives',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Mali',
            'slug' => 'mali',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Malta',
            'slug' => 'malta',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 6
        ]);
        DB::table('countries')->insert([
            'name' => 'Marshall Islands',
            'slug' => 'marshall-islands',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 4
        ]);
        DB::table('countries')->insert([
            'name' => 'Mauritania',
            'slug' => 'mauritania',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Mauritius',
            'slug' => 'mauritius',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Mexico',
            'slug' => 'mexico',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 6
        ]);
        DB::table('countries')->insert([
            'name' => 'Micronesia',
            'slug' => 'micronesia',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 4
        ]);
        DB::table('countries')->insert([
            'name' => 'Moldova',
            'slug' => 'moldova',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Monaco',
            'slug' => 'monaco',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Mongolia',
            'slug' => 'mongolia',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Montenegro',
            'slug' => 'montenegro',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Morocco',
            'slug' => 'morocco',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Mozambique',
            'slug' => 'mozambique',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Namibia',
            'slug' => 'namibia',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Nauru',
            'slug' => 'nauru',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 4
        ]);
        DB::table('countries')->insert([
            'name' => 'Nepal',
            'slug' => 'nepal',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Netherlands',
            'slug' => 'netherlands', 
            'code' => 'https://broad.msu.edu/education-abroad/programs/?term%5B%27term%27%5D=All&subject%5B%27subject%27%5D=All&program%5B%27program%27%5D=All&region%5B%27region%27%5D=All&country%5B1488%5D=1488&filterType=OR&submit=Submit',
            'color' => rand(4,10), 
            'enabled' => 'on', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'New Zealand',
            'slug' => 'new-zealand', 
            'code' => 'https://broad.msu.edu/education-abroad/programs/?term%5B%27term%27%5D=All&subject%5B%27subject%27%5D=All&program%5B%27program%27%5D=All&region%5B%27region%27%5D=All&country%5B1489%5D=1489&filterType=OR&submit=Submit',
            'color' => rand(4,10), 
            'enabled' => 'on', 
            'continent_id' => 4
        ]);
        DB::table('countries')->insert([
            'name' => 'Nicaragua',
            'slug' => 'nicaragua',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 6
        ]);
        DB::table('countries')->insert([
            'name' => 'Niger',
            'slug' => 'niger',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Nigeria',
            'slug' => 'nigeria',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Norway',
            'slug' => 'norway', 
            'code' => 'https://broad.msu.edu/education-abroad/programs/?term%5B%27term%27%5D=All&subject%5B%27subject%27%5D=All&program%5B%27program%27%5D=All&region%5B%27region%27%5D=All&country%5B1490%5D=1490&filterType=OR&submit=Submit',
            'color' => rand(4,10), 
            'enabled' => 'on', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Oman',
            'slug' => 'oman',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Pakistan',
            'slug' => 'pakistan',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Palau',
            'slug' => 'palau',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 4
        ]);
        DB::table('countries')->insert([
            'name' => 'Panama',
            'slug' => 'panama',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 6
        ]);
        DB::table('countries')->insert([
            'name' => 'Papua New Guinea',
            'slug' => 'papua-new-guinea',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 4
        ]);
        DB::table('countries')->insert([
            'name' => 'Paraguay',
            'slug' => 'paraguay',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 7
        ]);
        DB::table('countries')->insert([
            'name' => 'Peru',
            'slug' => 'peru',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 7
        ]);
        DB::table('countries')->insert([
            'name' => 'Philippines',
            'slug' => 'philippines',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Poland',
            'slug' => 'poland',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Portugal',
            'slug' => 'portugal', 
            'code' => 'https://broad.msu.edu/education-abroad/programs/?term%5B%27term%27%5D=All&subject%5B%27subject%27%5D=All&program%5B%27program%27%5D=All&region%5B%27region%27%5D=All&country%5B1491%5D=1491&filterType=OR&submit=Submit',
            'color' => rand(4,10), 
            'enabled' => 'on', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Qatar',
            'slug' => 'qatar',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Romania',
            'slug' => 'romania',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Russian Federation',
            'slug' => 'russia', 
            'code' => 'https://broad.msu.edu/education-abroad/programs/?term%5B%27term%27%5D=All&subject%5B%27subject%27%5D=All&program%5B%27program%27%5D=All&region%5B%27region%27%5D=All&country%5B1492%5D=1492&filterType=OR&submit=Submit',
            'color' => rand(4,10), 
            'enabled' => 'on', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Rwanda',
            'slug' => 'rwanda',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Saint Kitts and Nevis',
            'slug' => 'saint-kitts-and-nevis',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 6
        ]);
        DB::table('countries')->insert([
            'name' => 'Saint Lucia',
            'slug' => 'saint-lucia',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 6
        ]);
        DB::table('countries')->insert([
            'name' => 'Saint Vincent and the Grenadines',
            'slug' => 'saint-vincent-and-the-grenadines',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 6
        ]);
        DB::table('countries')->insert([
            'name' => 'Samoa',
            'slug' => 'samoa',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 4
        ]);
        DB::table('countries')->insert([
            'name' => 'San Marino',
            'slug' => 'san-marino',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Sao Tome and Principe',
            'slug' => 'sao-tome-and-principe',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Saudi Arabia',
            'slug' => 'saudi-arabia',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Senegal',
            'slug' => 'senegal',
            'code' => 'https://broad.msu.edu/education-abroad/programs/?term%5B%27term%27%5D=All&subject%5B%27subject%27%5D=All&program%5B%27program%27%5D=All&region%5B%27region%27%5D=All&country%5B1493%5D=1493&filterType=OR&submit=Submit', 
            'color' => rand(4,10), 
            'enabled' => 'on', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Serbia',
            'slug' => 'serbia',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Seychelles',
            'slug' => 'seychelles',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Sierra Leone',
            'slug' => 'sierra-leone',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Singapore',
            'slug' => 'singapore', 
            'code' => 'https://broad.msu.edu/education-abroad/programs/?term%5B%27term%27%5D=All&subject%5B%27subject%27%5D=All&program%5B%27program%27%5D=All&region%5B%27region%27%5D=All&country%5B1494%5D=1494&filterType=OR&submit=Submit',
            'color' => rand(4,10), 
            'enabled' => 'on', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Slovakia',
            'slug' => 'slovakia',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Slovenia',
            'slug' => 'slovenia',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Solomon Islands',
            'slug' => 'solomon-islands',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 4
        ]);
        DB::table('countries')->insert([
            'name' => 'Somalia',
            'slug' => 'somalia',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'South Africa',
            'slug' => 'south-africa',
            'code' => 'https://broad.msu.edu/education-abroad/programs/?term%5B%27term%27%5D=All&subject%5B%27subject%27%5D=All&program%5B%27program%27%5D=All&region%5B%27region%27%5D=All&country%5B1495%5D=1495&filterType=OR&submit=Submit', 
            'color' => rand(4,10), 
            'enabled' => 'on', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'South Sudan',
            'slug' => 'south-sudan',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Spain',
            'slug' => 'spain',
            'code' => 'https://broad.msu.edu/education-abroad/programs/?term%5B%27term%27%5D=All&subject%5B%27subject%27%5D=All&program%5B%27program%27%5D=All&region%5B%27region%27%5D=All&country%5B1496%5D=1496&filterType=OR&submit=Submit', 
            'color' => rand(4,10), 
            'enabled' => 'on', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Sri Lanka',
            'slug' => 'sri-lanka',
            'color' => rand(4,10),
            'enabled' => 'off',  
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Sudan',
            'slug' => 'sudan',
            'enabled' => 'off', 
            'color' => rand(4,10), 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Suriname',
            'slug' => 'suriname',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 7
        ]);
        DB::table('countries')->insert([
            'name' => 'Swaziland',
            'slug' => 'swaziland',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Sweden',
            'slug' => 'sweden',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Switzerland',
            'slug' => 'switzerland', 
            'code' => '',
            'color' => rand(4,10), 
            'enabled' => 'on', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Syria',
            'slug' => 'syria',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Tajikistan',
            'slug' => 'takikistan',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Tanzania',
            'slug' => 'tanzania',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Thailand',
            'slug' => 'thailand', 
            'code' => 'https://broad.msu.edu/education-abroad/programs/?term%5B%27term%27%5D=All&subject%5B%27subject%27%5D=All&program%5B%27program%27%5D=All&region%5B%27region%27%5D=All&country%5B1498%5D=1498&filterType=OR&submit=Submit',
            'color' => rand(4,10), 
            'enabled' => 'on', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Togo',
            'slug' => 'togo',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Tonga',
            'slug' => 'tonga',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 4
        ]);
        DB::table('countries')->insert([
            'name' => 'Trinidad and Tobago',
            'slug' => 'trinidad-and-tobago',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 6
        ]);
        DB::table('countries')->insert([
            'name' => 'Tunisia',
            'slug' => 'tunisia',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Turkey',
            'slug' => 'turkey',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Turkmenistan',
            'slug' => 'turkmenistan',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Tuvalu',
            'slug' => 'tuvalu',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 4
        ]);
        DB::table('countries')->insert([
            'name' => 'Uganda',
            'slug' => 'uganda',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Ukraine',
            'slug' => 'ukraine',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'United Arab Emirates',
            'slug' => 'united-arab-emirates',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'United Kingdom',
            'slug' => 'united-kingdom', 
            'code' => 'https://broad.msu.edu/education-abroad/programs/?term%5B%27term%27%5D=All&subject%5B%27subject%27%5D=All&program%5B%27program%27%5D=All&region%5B%27region%27%5D=All&country%5B1499%5D=1499&filterType=OR&submit=Submit',
            'color' => rand(4,10), 
            'enabled' => 'on', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'United States',
            'slug' => 'united-states', 
            'enabled' => 'off', 
            'color' => rand(4,10), 
            'continent_id' => 6
        ]);
        DB::table('countries')->insert([
            'name' => 'Uruguay',
            'slug' => 'uruguay',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 7
        ]);
        DB::table('countries')->insert([
            'name' => 'Uzbekistan',
            'slug' => 'uzbekistan',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Vanuatu',
            'slug' => 'vanuatu',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 4
        ]);
        DB::table('countries')->insert([
            'name' => 'Vatican City',
            'slug' => 'vatican-city',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Venezuela',
            'slug' => 'venezuela',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 7
        ]);
        DB::table('countries')->insert([
            'name' => 'Vietnam',
            'slug' => 'vietnam',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Yemen',
            'slug' => 'yemen',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Zambia',
            'slug' => 'zambia',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Zimbabwe',
            'slug' => 'zimbabwe',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'Western Sahara',
            'slug' => 'western-sahara',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 1
        ]);
        DB::table('countries')->insert([
            'name' => 'French Gulana',
            'slug' => 'french-gulana',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 7
        ]);
        DB::table('countries')->insert([
            'name' => 'Kosovo',
            'slug' => 'kosovo',
            'color' => rand(4,10), 
            'enabled' => 'off', 
            'continent_id' => 5
        ]);
        DB::table('countries')->insert([
            'name' => 'Greenland',
            'slug' => 'greenland',
            'enabled' => 'off', 
            'color' => rand(4,10), 
            'continent_id' => 0
        ]);
        DB::table('countries')->insert([
            'name' => 'Tajikistan',
            'slug' => 'tajikistan',
            'enabled' => 'off', 
            'color' => rand(4,10), 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Taiwan',
            'slug' => 'taiwan',
            'enabled' => 'off', 
            'color' => rand(4,10), 
            'continent_id' => 3
        ]);
        DB::table('countries')->insert([
            'name' => 'Hong Kong',
            'slug' => 'hong-kong', 
            'code' => 'https://broad.msu.edu/education-abroad/programs/?term%5B%27term%27%5D=All&subject%5B%27subject%27%5D=All&program%5B%27program%27%5D=All&region%5B%27region%27%5D=All&country%5B1478%5D=1478&filterType=OR&submit=Submit', 
            'enabled' => 'on', 
            'color' => rand(4,10), 
            'continent_id' => 3
        ]);
    }
}
