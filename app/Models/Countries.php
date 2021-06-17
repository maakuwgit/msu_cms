<?php

namespace App\Models;

use App\Models\Gallery;
use App\Models\Continent;
use App\Models\Programs;

use Illuminate\Database\Eloquent\Model;

class Countries extends Model
{
    protected $fillable = ([
        'name', 
        'slug', 
        'code', 
        'color', 
        'enabled',
        'continent_id', 
        'supended'
    ]);

    public function continent() {
        return $this->belongsTo(Continent::class);
    }

    public function programs() {
        return $this->belongsToMany(Programs::class);
    }

    public function gallery() {
        return $this->hasOne(Gallery::class);
    }
}