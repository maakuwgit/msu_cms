<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Routing\UrlGenerator;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'username' => 'maakuwadmin',
            'first_name' => 'Mark',
            'last_name' => 'Williamson',
            'user_level_id' => 1, 
            'email' => 'mwilliamson@bluewatertech.com',
            'photo' => env('APP_URL','laravel') . '/images/user__maakuw.jpg',
            'password' => bcrypt('m1Ch!9@N')
        ]);
        DB::table('users')->insert([
            'username' => 'sscott',
            'first_name' => 'Sarah',
            'last_name' => 'Scott',
            'user_level_id' => 2, 
            'email' => 'sscott@broad.msu.edu',
            'photo' => env('APP_URL','laravel') . '/images/user__sparty.jpg',
            'password' => bcrypt('Sp@rty!'),
        ]);
        DB::table('users')->insert([
            'username' => 'bseiber',
            'first_name' => 'Ben',
            'last_name' => 'Seiber',
            'user_level_id' => 2, 
            'email' => 'bseiber@bluewatertech.com',
            'photo' => '//via.placeholder.com/100x100',
            'password' => bcrypt('B1u3W@t3R'),
        ]);
        DB::table('users')->insert([
            'username' => 'pphelps',
            'first_name' => 'Paula',
            'last_name' => 'Phelps',
            'user_level_id' => 2, 
            'email' => 'pphelps@bluewatertech.com',
            'photo' => '//via.placeholder.com/100x100',
            'password' => bcrypt('B1u3W@t3R'),
        ]);
    }
}
