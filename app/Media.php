<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{

    protected $table = 'media';

    protected $fillable = ['media_name', 'media_type'];
}
