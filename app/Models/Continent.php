<?php

namespace App\Models;

use App\Models\Countries;
use Illuminate\Database\Eloquent\Model;

class Continent extends Model
{
    protected $fillable = ([
        'name', 
        'slug', 
        'enabled'
    ]);

    public function countries(){
        return $this->hasMany(Countries::class);
    }
}
