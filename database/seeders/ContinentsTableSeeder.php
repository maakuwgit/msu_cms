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
        ]);//1
        DB::table('continents')->insert([
            'name' =>  'Antartica',
            'slug' =>  'antartica', 
            'enabled' => 'off'
        ]);//2
        DB::table('continents')->insert([
            'name' =>  'Asia',
            'slug' =>  'asia'
        ]);//3
        DB::table('continents')->insert([
            'name' =>  'Oceania',
            'slug' =>  'oceania'
        ]);//4
        DB::table('continents')->insert([
            'name' =>  'Europe',
            'slug' =>  'europe'
        ]);//5
        DB::table('continents')->insert([
            'name' =>  'North America',
            'slug' =>  'north-america'
        ]);//6
        DB::table('continents')->insert([
            'name' =>  'South America',
            'slug' =>  'south-america'
        ]);//7
    }
}