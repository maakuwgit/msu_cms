<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProgramsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('programs')->insert([
            'name' =>  'American University of Rome',
            'semester' => 'Fall, Spring, Summer', 
            'suspended' => 'off'
        ]);//1
        DB::table('programs')->insert([
            'name' =>  'BI Norwegian Business School',
            'semester' => 'Summer', 
            'suspended' => 'off'
        ]);//2
        DB::table('programs')->insert([
            'name' =>  'Bocconi University',
            'semester' => 'Fall, Spring', 
            'suspended' => 'off'
        ]);//3
        DB::table('programs')->insert([
            'name' =>  'Business and Culture in Brazil',
            'semester' => 'Spring Break', 
            'suspended' => 'off'
        ]);//4
        DB::table('programs')->insert([
            'name' =>  'Business and Culture in Japan',
            'semester' => 'Spring Break', 
            'suspended' => 'off'
        ]);//5
        DB::table('programs')->insert([
            'name' =>  'Business and Culture in Spain',
            'semester' => 'Spring Break', 
            'suspended' => 'off'
        ]);//6
        DB::table('programs')->insert([
            'name' =>  'Business and Culture in St. Petersburg',
            'semester' => 'Summer', 
            'suspended' => 'off'
        ]);//7
        DB::table('programs')->insert([
            'name' =>  'Business In Scotland',
            'semester' => 'Summer', 
            'suspended' => 'off'
        ]);//8
        DB::table('programs')->insert([
            'name' =>  'Business of the Olympics',
            'semester' => 'Summer', 
            'suspended' => 'off'
        ]);//9
        DB::table('programs')->insert([
            'name' =>  'Business Studies at Universitat Pompeu Fabra',
            'semester' => 'Spring', 
            'suspended' => 'off'
        ]);//10
        DB::table('programs')->insert([
            'name' =>  'Business Law, Ethics and Sustainability in an Emerging Global Market',
            'semester' => 'Summer', 
            'suspended' => 'off'
        ]);//11
        DB::table('programs')->insert([
            'name' =>  'CETT - University of Barcelona',
            'semester' => 'Fall, Spring', 
            'suspended' => 'off'
        ]);//12
        DB::table('programs')->insert([
            'name' =>  'Chulalongkorn University',
            'semester' => 'Fall, Spring, Academic Year', 
            'suspended' => 'off'
        ]);//13
        DB::table('programs')->insert([
            'name' =>  'City University of Hong Kong',
            'semester' => 'Fall, Spring, Summer', 
            'suspended' => 'off'
        ]);//14
        DB::table('programs')->insert([
            'name' =>  'Corvinus University of Budapest',
            'semester' => 'Fall, Spring', 
            'suspended' => 'off'
        ]);//15
        DB::table('programs')->insert([
            'name' =>  'Doing Business in South Africa',
            'semester' => 'Summer', 
            'suspended' => 'off'
        ]);//16
        DB::table('programs')->insert([
            'name' =>  'European Innovation Academy',
            'semester' => 'Summer', 
            'suspended' => 'off'
        ]);//17
        DB::table('programs')->insert([
            'name' =>  'Global Finance Studies in Belgium',
            'semester' => 'Summer', 
            'suspended' => 'off'
        ]);//18
        DB::table('programs')->insert([
            'name' =>  'Hebrew University of Jerusalem',
            'semester' => 'Spring', 
            'suspended' => 'off'
        ]);//19
        DB::table('programs')->insert([
            'name' =>  'Hong Kong Polytechnic University',
            'semester' => 'Fall, Spring', 
            'suspended' => 'off'
        ]);//20
        DB::table('programs')->insert([
            'name' =>  'Hong Kong University of Science and Technology (HKUST)',
            'semester' => 'Fall, Spring, Summer, Academic Year', 
            'suspended' => 'off'
        ]);//21
        DB::table('programs')->insert([
            'name' =>  'Business Studies at Monash University Malaysia',
            'semester' => 'Spring', 
            'suspended' => 'off'
        ]);//22
        DB::table('programs')->insert([
            'name' =>  'International College of Management Sydney (ICMS)',
            'semester' => 'Fall, Spring, Summer', 
            'suspended' => 'off'
        ]);//23
        DB::table('programs')->insert([
            'name' =>  'Internships in Lisbon',
            'semester' => 'Summer', 
            'suspended' => 'off'
        ]);//24
        DB::table('programs')->insert([
            'name' =>  'Internships in Singapore',
            'semester' => 'Summer', 
            'suspended' => 'off'
        ]);//25
        DB::table('programs')->insert([
            'name' =>  'Japan Center for Michigan Universities - Entrepreneurships in Japan',
            'semester' => 'Summer', 
            'suspended' => 'off'
        ]);//26
        DB::table('programs')->insert([
            'name' =>  'Japan Center for Michigan Universities - Business and Japanese Language',
            'semester' => 'Fall, Spring', 
            'suspended' => 'off'
        ]);//27
        DB::table('programs')->insert([
            'name' =>  'Managing Strategy in a Growing Economy',
            'semester' => 'Winter Break', 
            'suspended' => 'off'
        ]);//28
        DB::table('programs')->insert([
            'name' =>  'Marketing and International Comparative Dimensions of Business in Europe',
            'semester' => 'Summer', 
            'suspended' => 'off'
        ]);//29
        DB::table('programs')->insert([
            'name' =>  'Marketing and Business in London',
            'semester' => 'Winter Break', 
            'suspended' => 'off'
        ]);//30
        DB::table('programs')->insert([
            'name' =>  'Marketing in China',
            'semester' => 'Summer', 
            'suspended' => 'off'
        ]);//31
        DB::table('programs')->insert([
            'name' =>  'New Zealand Kiwi Hospitality Wine and Food',
            'semester' => 'Summer', 
            'suspended' => 'off'
        ]);//32
        DB::table('programs')->insert([
            'name' =>  'NHL Stenden University',
            'semester' => 'Fall, Spring', 
            'suspended' => 'off'
        ]);//33
        DB::table('programs')->insert([
            'name' =>  'Organizational Staffing in London',
            'semester' => 'Summer', 
            'suspended' => 'off'
        ]);//34
        DB::table('programs')->insert([
            'name' =>  'Semester in Buenos Aires',
            'semester' => 'Spring', 
            'suspended' => 'off'
        ]);//35
        DB::table('programs')->insert([
            'name' =>  'Semester in Florence',
            'semester' => 'Spring', 
            'suspended' => 'off'
        ]);//36
        DB::table('programs')->insert([
            'name' =>  'Semester in Shanghai',
            'semester' => 'Spring', 
            'suspended' => 'off'
        ]);//37
        DB::table('programs')->insert([
            'name' =>  'Internships in Shanghai',
            'semester' => 'Summer', 
            'suspended' => 'off'
        ]);//38
        DB::table('programs')->insert([
            'name' =>  'Grassroots Tools of Sustainable Development: Service Learning in Guatemala',
            'semester' => 'Spring Break', 
            'suspended' => 'off'
        ]);//39
        DB::table('programs')->insert([
            'name' =>  'Service Learning in Senegal: School Building with buildOn',
            'semester' => 'Spring Break', 
            'suspended' => 'off'
        ]);//40
        DB::table('programs')->insert([
            'name' =>  'StartUp Nation: Innovation and Entrepreneurship in Israel',
            'semester' => 'Winter Break', 
            'suspended' => 'off'
        ]);//41
        DB::table('programs')->insert([
            'name' =>  'Tel Aviv University',
            'semester' => 'Spring, Summer', 
            'suspended' => 'off'
        ]);//42
        DB::table('programs')->insert([
            'name' =>  'University of Namur',
            'semester' => 'Fall, Spring, Academic Year', 
            'suspended' => 'off'
        ]);//43
        DB::table('programs')->insert([
            'name' =>  'University of New South Wales (UNSW)',
            'semester' => 'Spring', 
            'suspended' => 'off'
        ]);//44
        DB::table('programs')->insert([
            'name' =>  'University of Stavanger',
            'semester' => 'Fall, Spring', 
            'suspended' => 'off'
        ]);//45
        DB::table('programs')->insert([
            'name' =>  'University of Sydney',
            'semester' => 'Spring', 
            'suspended' => 'off'
        ]);//46
        DB::table('programs')->insert([
            'name' =>  'University of Waikato',
            'semester' => 'Spring', 
            'suspended' => 'off'
        ]);//47
        DB::table('programs')->insert([
            'name' =>  'Great Lakes Supply Chain Tour',
            'semester' => 'Summer', 
            'suspended' => 'off'
        ]);//48
        DB::table('programs')->insert([
            'name' =>  'International Business Studies in Europe',
            'semester' => 'Summer', 
            'suspended' => 'off'
        ]);//49
        DB::table('programs')->insert([
            'name' =>  'Honors Semester at Monash University',
            'semester' => 'Spring', 
            'suspended' => 'off'
        ]);//50
    }
}