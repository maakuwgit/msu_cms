<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MediaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Italy
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "american-university-of-rome-2.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 1
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "american-university-of-rome.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 1
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "bocconi_university__milan.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 1
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "semester-in-florence.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 1
        ]);
        DB::table('media')->insert([
            'type'       => 2,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "abroad_advice_101--AUR.mp4" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 1
        ]);
        DB::table('media')->insert([
            'type'       => 2,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "american_university_of_rome.mp4" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 1
        ]);
        //Norway
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "bi-norwegian-business-school__oslo.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 2
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "bi-norwegian-business-school__oslo-2.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 2
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "university-of-stavanger.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 2
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "university-of-stavanger-2.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 2
        ]);
        //Hungary
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "corvinus-university-of-budapest.png" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 24
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "corvinus-university-of-budapest-2.png" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 24
        ]);
        DB::table('media')->insert([
            'type'       => 2,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "abroad_advice_101--corvinus_university.mp4" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 24
        ]);
        //Argentina
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "semester-in-buenos-aires.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 17
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "semester-in-buenos-aires-2.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 17
        ]);
        //Brazil
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "business-and-culture-in-brazil__rio_de_janeiro-2.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 3
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "business-and-culture-in-brazil__rio_de_janeiro.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 3
        ]);
        DB::table('media')->insert([
            'type'       => 2,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "program_highlights--business_and_culture_in_brazil.mp4" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 3
        ]);
        //Japan
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "business-and-culture-in-japan__tokyo.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 4
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "business-and-culture-in-japan__tokyo-2.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 4
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "jcmu-entrepreneurship-in-japan__hikone.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 4
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "jcmu-entrepreneurship-in-japan__hikone-2.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 4
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "jcmu-semester-business-and-japanese-language__hikone.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 4
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "jcmu-semester-business-and-japanese-language__hikone-2.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 4
        ]);
        DB::table('media')->insert([
            'type'       => 2,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "business_and_culture_in_japan.mp4" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 4
        ]);
        DB::table('media')->insert([
            'type'       => 2,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "education_abroad_alumni_experiences--shari_kendrick.mp4" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 4
        ]);
        DB::table('media')->insert([
            'type'       => 2,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "education_abroad_alumni_experiences--lin_yuan--linc.mp4" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 4
        ]);
        //Russia
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "business-and-culture-in-st-petersburg.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 5
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "business-and-culture-in-st-petersburg-2.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 5
        ]);
        //UK
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "business-in-scotland.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 6
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "business-in-scotland-2.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 6
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "marketing-and-business-in-london.png" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 6
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "marketing-and-business-in-london-2.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 6
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "organizational-staffing-in-london.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 6
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "organizational-staffing-in-london-2.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 6
        ]);
        DB::table('media')->insert([
            'type'       => 2,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "education_abroad_alumni_experiences--lin_yuan--linc.mp4" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 6
        ]);
        //Spain
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "business-and-culture-in-spain-2.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 7
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "business-and-culture-in-spain.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 7
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "business-of-the-olympics-2.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 7
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "business-of-the-olympics.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 7
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "business-studies-at-universitat-pompeu-fabra__barcelona-2.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 7
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "business-studies-at-universitat-pompeu-fabra__barcelona.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 7
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "cett-university-of-barcelona-2.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 7
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "cett-university-of-barcelona.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 7
        ]);
        DB::table('media')->insert([
            'type'       => 2,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "program_highlights--business_and_culture_in_spain.mp4" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 7
        ]);
        //Greece
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "business-law-ethics-and-sustainability-in-an-emerging-global-market.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 8
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "business-law-ethics-and-sustainability-in-an-emerging-global-market-2.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 8
        ]);
        //India
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "managing-strategy-in-a-growing-economy-in-india.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 9
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "managing-strategy-in-a-growing-economy-in-india-2.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 9
        ]);
        //South Africa
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "doing-business-in-south-africa-2.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 10
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "doing-business-in-south-africa.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 10
        ]);
        //Belgium
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "global-finance-studies-in-belgium__namur-2.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 11
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "global-finance-studies-in-belgium__namur.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 11
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "university-of-namur.png" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 11
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "university-of-namur-2.png" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 11
        ]);
        //China
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "internships_in_asia__shanghai-2.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 12
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "internships_in_asia__shanghai.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 12
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "marketing-in-china-2.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 12
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "marketing-in-china.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 12
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "semester-in-shanghai-2.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 12
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "semester-in-shanghai.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 12
        ]);
        DB::table('media')->insert([
            'type'       => 2,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "education_abroad_alumni_experiences--shari_kendrick.mp4" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 12
        ]);
        //Thailand
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "chulalongkorn-university__bangkok-2.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 26
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "chulalongkorn-university__bangkok.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 26
        ]);
        DB::table('media')->insert([
            'type'       => 2,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "abroad_advice_101--chulalongkorn_university.mp4" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 26
        ]);
        //Hong Kong
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "city_u_of_hong_kong-2.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 23
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "city_u_of_hong_kong.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 23
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "hong_kong_polytechnic_university.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 23
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "hong-kong-university-of-science-and-technology-2.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 23
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "hong-kong-university-of-science-and-technology.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 23
        ]);
        //Portugal
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "european-innovation-academy__lisbon-2.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 13
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "european-innovation-academy__lisbon.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 13
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "internships_in_asia__lisbon-2.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 13
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "internships_in_asia__lisbon.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 13
        ]);
        //Singapore
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "internships-in-singapore.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 14
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "internships-in-singapore-2.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 14
        ]);
        //New Zealand
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "new-zealand-kiwi-hospitality-wine-and-food--waikato-2.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 15
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "new-zealand-kiwi-hospitality-wine-and-food--waikato.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 15
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "university-of-waikato--hamilton.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 15
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "university-of-waikato--hamilton-2.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 15
        ]);
        //Netherlands
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "nhl-stenden-university__leeuwarden.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 29
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "nhl-stenden-university__leeuwarden-2.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 29
        ]);
        DB::table('media')->insert([
            'type'       => 2,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "marketing_and_international_comparative_dimensions_of_business_in_europe.mp4" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 29
        ]);
        //France
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "marketing-and-international-comparative-dimensions-of-business-in-europe.png" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 25
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "marketing-and-international-comparative-dimensions-of-business-in-europe-2.png" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 25
        ]);
        DB::table('media')->insert([
            'type'       => 2,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "marketing_and_international_comparative_dimensions_of_business_in_europe.mp4" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 25
        ]);
        //Austria
        DB::table('media')->insert([
            'type'       => 2,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "marketing_and_international_comparative_dimensions_of_business_in_europe.mp4" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 27
        ]);
        //Guatemala
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "service-learning-in-guatemala__antigua.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 18
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "service-learning-in-guatemala__antigua-2.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 18
        ]);
        //Senegal
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "service-learning-in-senegal__dakar.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 19
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "service-learning-in-senegal__dakar-2.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 19
        ]);
        //Israel
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "hebrew-university-of-jerusalem.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 20
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "hebrew-university-of-jerusalem-2.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 20
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "startup-nation-in-israel.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 20
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "startup-nation-in-israel-2.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 20
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "tel-aviv-university.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 20
        ]);
        DB::table('media')->insert([
            'type'       => 2,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "abroad_advice_101--tel_aviv_university.mp4" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 20
        ]);
        //Australia
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "university-of-sydney.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 21
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "university-of-sydney-2.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 21
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "university-of-new-south-wales__sydney.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 21
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "university-of-new-south-wales__sydney-2.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 21
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "international-college-of-management__sydney.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 21
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "international-college-of-management__sydney-2.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 21
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "honors-semester-at-monash-university__melbourne.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 21
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "honors-semester-at-monash-university__melbourne-2.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 21
        ]);
        DB::table('media')->insert([
            'type'       => 2,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "education_abroad_alumni_experiences--lin_yuan--linc.mp4" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 21
        ]);
        //Canada
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "us-and-canada__great-lakes-sc-tour__canada.jpg" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 22
        ]);
        DB::table('media')->insert([
            'type'       => 1,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "us-and-canada__great-lakes-sc-tour__canada-2.png" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 22
        ]);
        //Switzerland
        DB::table('media')->insert([
            'type'       => 2,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "marketing_and_international_comparative_dimensions_of_business_in_europe.mp4" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 28
        ]);
        //Germany
        DB::table('media')->insert([
            'type'       => 2,
            'url'        => env('FIREBASE_URL_PREFIX', 'Laravel') . "marketing_and_international_comparative_dimensions_of_business_in_europe.mp4" . env('FIREBASE_URL_SUFFIX', 'Laravel'),
            'gallery_id' => 16
        ]);
    }
}
