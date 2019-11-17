<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PageBlock extends Model
{
    protected $fillable = [
        'page_id', 'section_type', 'section_content', 'order'
    ];
}
