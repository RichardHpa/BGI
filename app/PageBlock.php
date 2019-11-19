<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PageBlock extends Model
{
    protected $fillable = [
        'page_id', 'block_type', 'block_content', 'order'
    ];

    public function page() {
        return $this->belongsTo('App\Page');
    }
}
