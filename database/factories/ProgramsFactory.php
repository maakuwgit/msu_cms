<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Program;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

$factory->define(Programs::class, function (Faker $faker) {
    return [
        'name' => $faker->catchPhrase(),
        'semester' => 'Summer, 2011-2012',
        'suspended' => $faker->numberBetween(0,1),
        'country_id' => $faker->numberBetween(1,191)
    ];
});
