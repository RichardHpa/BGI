<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class InfoController extends Controller
{
    public function index()
    {
        $info = array(
            'freeSpace'=>disk_free_space('/'),
            'totalSpace'=>disk_total_space('/')
        );
        return $info;
    }
}
