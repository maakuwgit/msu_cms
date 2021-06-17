<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserLevelTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('user_level')->insert([
            'name' => 'Admin',
            'slug' => 'admin',
            'level' => 1
        ]);
        DB::table('user_level')->insert([
            'name' => 'Manager',
            'slug' => 'manager',
            'level' => 2
        ]);
    }
}
