<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            UsersTableSeeder::class, 
            UserLevelTableSeeder::class,
            ContinentsTableSeeder::class,
            CountriesTableSeeder::class,
            CountriesProgramsTableSeeder::class,
            GalleriesTableSeeder::class,
            MediaTableSeeder::class,
            ProgramsTableSeeder::class
        ]);
    }
}
