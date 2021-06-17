<?php

namespace App\Models;

use App\Models\Countries;
use App\Models\Media;
use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    protected $fillable = ([
        'countries_id'
    ]);

    public function countries() {
        return $this->belongsTo(Countries::class);
    }

    public function media() {
        return $this->hasMany(Media::class);
    }
}
