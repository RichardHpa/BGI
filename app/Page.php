<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    protected $fillable = [
        'page_title', 'page_url', 'template', 'protected', 'featured_image',
    ];

    public function blocks() {
        return $this->hasMany('App\PageBlock');
    }
}
