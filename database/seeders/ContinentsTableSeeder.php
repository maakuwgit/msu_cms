<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ContinentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('continents')->insert([
            'name' =>  'Africa',
            'slug' =>  'africa'
        ]);
        DB::table('continents')->insert([
            'name' =>  'Antartica',
            'slug' =>  'antartica', 
            'enabled' => 'off'
        ]);
        DB::table('continents')->insert([
            'name' =>  'Asia',
            'slug' =>  'asia'
        ]);
        DB::table('continents')->insert([
            'name' =>  'Oceania',
            'slug' =>  'oceania'
        ]);
        DB::table('continents')->insert([
            'name' =>  'Europe',
            'slug' =>  'europe'
        ]);
        DB::table('continents')->insert([
            'name' =>  'North America',
            'slug' =>  'north-america'
        ]);
        DB::table('continents')->insert([
            'name' =>  'South America',
            'slug' =>  'south-america'
        ]);
    }
}