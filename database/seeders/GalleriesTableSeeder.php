<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GalleriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //1 Italy
        DB::table('galleries')->insert([
            'countries_id' => 84
        ]);
        //2 Norway
        DB::table('galleries')->insert([
            'countries_id' => 130
        ]);
        //3 Brazil
        DB::table('galleries')->insert([
            'countries_id' => 24
        ]);
        //4 Japan
        DB::table('galleries')->insert([
            'countries_id' => 86
        ]);
        //5 Russia
        DB::table('galleries')->insert([
            'countries_id' => 143
        ]);
        //6 UK
        DB::table('galleries')->insert([
            'countries_id' => 184
        ]);
        //7 Spain
        DB::table('galleries')->insert([
            'countries_id' => 163
        ]);
        //8 Greece
        DB::table('galleries')->insert([
            'countries_id' => 67
        ]);
        //9 India
        DB::table('galleries')->insert([
            'countries_id' => 77
        ]);
        //10 South Africa
        DB::table('galleries')->insert([
            'countries_id' => 161
        ]);
        //11 Belgium
        DB::table('galleries')->insert([
            'countries_id' => 17
        ]);
        //12 China
        DB::table('galleries')->insert([
            'countries_id' => 37
        ]);
        //13 Portugal
        DB::table('galleries')->insert([
            'countries_id' => 140
        ]);
        //14 Singapore
        DB::table('galleries')->insert([
            'countries_id' => 156
        ]);
        //15 New Zealand
        DB::table('galleries')->insert([
            'countries_id' => 126
        ]);
        //16 Germany
        DB::table('galleries')->insert([
            'countries_id' => 65
        ]);
        //17 Argentina
        DB::table('galleries')->insert([
            'countries_id' => 7
        ]);
        //18 Guatemala
        DB::table('galleries')->insert([
            'countries_id' => 69
        ]);
        //19 Senegal
        DB::table('galleries')->insert([
            'countries_id' => 152
        ]);
        //20 Israel
        DB::table('galleries')->insert([
            'countries_id' => 82
        ]);
        //21 Australia
        DB::table('galleries')->insert([
            'countries_id' => 9
        ]);
        //22 Canada
        DB::table('galleries')->insert([
            'countries_id' => 32
        ]);
    }
}
