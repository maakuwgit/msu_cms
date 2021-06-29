<?php

namespace App\Models;

use App\Models\Gallery;
use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $fillable = ([
        'url',
        'type',  
        'gallery_id', 
        'credit', 
        'poster'
    ]);

    public function gallery() {
        return $this->belongsToOne(Gallery::class);
    }
}
