<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CountriesPrograms extends Model
{
    protected $fillable = ([
        'countries_id',
        'programs_id'
    ]);
}
