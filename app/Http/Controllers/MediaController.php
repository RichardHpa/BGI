<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Intervention\Image\ImageManager;

use App\Media;

class MediaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $media = Media::all();
        return $media->toJson();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $manager = new ImageManager();
        $heroImage = $manager->make($request['file']);
        $imageName = uniqid();
        $originalFolder = 'images/uploads/originals';
        if( ! is_dir($originalFolder)){
            mkdir($originalFolder, 0777, true);
        }
        $heroImage->save($originalFolder.'/'.$imageName.'.'.$request->extention, 100);

        $thumbFolder = 'images/uploads/thumbnails';
        if( ! is_dir($thumbFolder)){
            mkdir($thumbFolder, 0777, true);
        }
        $thumbnailImage = $manager->make($request['file']);
        $thumbnailImage->resize(600, null, function($constraint){
            $constraint->aspectRatio();
            $constraint->upsize();
        });
        $thumbnailImage->save($thumbFolder.'/'.$imageName.'.'.$request->extention, 100);

        $squareFolder = 'images/uploads/square';
        if( ! is_dir($squareFolder)){
            mkdir($squareFolder, 0777, true);
        }
        $squareImage = $manager->make($request['file']);
        $squareImage->fit(300);
        $squareImage->save($squareFolder.'/'.$imageName.'.'.$request->extention, 100);

        $media = Media::create([
            'media_name' => $imageName.'.'.$request->extention,
            'media_type' => $request->type
        ]);

        $result = array(
            'message' => 'success',
            'mediaInfo' => $media
        );

        return response()->json($result);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
