<?php

namespace App\Http\Controllers;

use App\Programmes;
use App\Media;
use Illuminate\Http\Request;

class ProgrammesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $programmes = Programmes::all();
        return $programmes->toJson();
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
        $programme = Programmes::create([
            'name' => $request->programme_tite,
            'clean_name' => strtolower(preg_replace('/\s+/', '_', $request->programme_tite)),
            'tag_line' => $request->programme_bio,
            'image' => $request->programme_image
        ]);

        $result = array(
            'message' => 'success',
            'pageInfo' => $programme
        );

        return response()->json($result);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Programmes  $programmes
     * @return \Illuminate\Http\Response
     */
    public function show(Programmes $programmes)
    {
        $programmes = Programmes::all();
        foreach($programmes as $programme){
            if($programme->image){
                $media = Media::where('id', '=', $programme->image)->firstOrFail();
                $programme['image'] = $media->media_name;
            }
        }
        return view('temp/programmes', compact('programmes'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Programmes  $programmes
     * @return \Illuminate\Http\Response
     */
    public function edit(Programmes $programmes)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Programmes  $programmes
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Programmes $programmes)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Programmes  $programmes
     * @return \Illuminate\Http\Response
     */
    public function destroy(Programmes $programmes)
    {
        //
    }
}
