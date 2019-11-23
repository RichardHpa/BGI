<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Programmes extends Model
{
    protected $fillable = [
        'name', 'clean_name', 'tag_line', 'image'
    ];
}
