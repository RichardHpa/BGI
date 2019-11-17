<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

use App\Page;
use App\PageBlock;
use App\Media;

class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pages = Page::all();
        return $pages->toJson();

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
        $allBlocks = json_decode($request['blocks']);
        $page = Page::create([
            'page_title' => $request->page_title,
            'page_url' => strtolower(preg_replace('/\s+/', '_', $request->page_title)),
            'template' => 'standard',
        ]);


        foreach ($allBlocks as $key=>$block) {
            $newBlock = PageBlock::create([
                'page_id' => $page->id,
                'section_type' => $block->section_type,
                'section_content' => $block->section_content,
                'order' => $key+1
            ]);
        }

        $result = array(
            'message' => 'success',
            'pageInfo' => $page
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
        $page = Page::where('page_url', '=', $id)->firstOrFail();
        // $blocks = $page->blocks;
        $blocks = PageBlock::where('page_id', '=', $page->id)->get();
        foreach($blocks as $block){
            if($block->section_type === 'imageBlock'){
                $media = Media::where('id', '=', $block->section_content)->firstOrFail();
                $block['section_content'] = $media->media_name;
            }
        }
        return view('templates/standard', compact('page', 'blocks'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        try{
            $page = Page::where('id', '=', $id)->firstOrFail();
            $blocks = $page->blocks;
            $result = array(
                'pageInfo' => $page,
            );
        }
        // catch(Exception $e) catch any exception
        catch(ModelNotFoundException $e){
            $result = '404';
        }

        return response()->json($result);
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
