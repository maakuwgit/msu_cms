<?php

namespace App\Models;

use App\Models\Countries;
use Illuminate\Database\Eloquent\Model;

class Programs extends Model
{
    protected $fillable = ([
        'name', 
        'semester', 
        'suspended'
    ]);

    public function countries() {
        return $this->belongsToMany(Countries::class);
    }
}
