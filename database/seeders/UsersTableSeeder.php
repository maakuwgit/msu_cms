<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

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
            'username' => 'admin',
            'first_name' => 'Bobby',
            'last_name' => 'Testeroni',
            'user_level_id' => 1, 
            'email' => 'maakuwemail@gmail.com',
            'photo' => '//via.placeholder.com/100x100',
            'password' => bcrypt('password'),
        ]);
        DB::table('users')->insert([
            'username' => 'msu',
            'first_name' => 'Manager',
            'last_name' => 'Username',
            'user_level_id' => 2, 
            'email' => 'dorianmgrey@gmail.com',
            'photo' => '//via.placeholder.com/100x100',
            'password' => bcrypt('m1Ch!9@N'),
        ]);
    }
}
