<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

use App\Page;
use App\PageBlock;
use App\Media;
use Illuminate\Support\Facades\Auth;

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
                'block_type' => $block->block_type,
                'block_content' => $block->block_content,
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
        $blocks = PageBlock::where('page_id', '=', $page->id)->get();
        foreach($blocks as $block){
            if($block->block_type === 'imageBlock'){
                $media = Media::where('id', '=', $block->block_content)->firstOrFail();
                $block['block_content'] = $media->media_name;
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
        $page = Page::where('id', '=', $id)->firstOrFail();

        $blocks = PageBlock::where('page_id', '=', $id)->get();
        $oldBlocks = array();
        foreach ($blocks as $block) {
            array_push($oldBlocks, $block['id']);
        }

        $allBlocks = json_decode($request['blocks']);
        $currentBlocks = array();
        foreach ($allBlocks as $key=>$currentBlock) {
            if($currentBlock->originalID === null){
                PageBlock::create([
                    'page_id' => $page->id,
                    'block_type' => $currentBlock->block_type,
                    'block_content' => $currentBlock->block_content,
                    'order' => $key+1
                ]);
            } else {
                $editBlock = PageBlock::where('id', '=', $currentBlock->originalID )->firstOrFail();
                $editBlock->block_content = $currentBlock->block_content;
                $editBlock->order = $key+1;
                $editBlock->save();
                array_push($currentBlocks, $currentBlock->originalID);
            }
        }

        $needToDelete = array_diff($oldBlocks, $currentBlocks);
        foreach ($needToDelete as $blockToDelete) {
            $removeBlock = PageBlock::where('id', '=', $blockToDelete)->firstOrFail();
            $removeBlock->delete();
        }
        $page->page_title = $request->page_title;
        $page->page_url = strtolower(preg_replace('/\s+/', '_', $request->page_title));
        $page->save();

        $result = array(
            'message' => 'success',
            'pageInfo' => $page
        );

        return response()->json($result);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if(Auth::check()){
            $currentLoggedUser = Auth::user();
            if($currentLoggedUser->hasAnyRole(['Super Admin', 'Admin'])){
                $page = Page::findOrFail($id);
                $page->delete();
                return response('success');
            } else {
                return response('they cant delete');
            }

        } else {
            return response('401');
        }
    }
}
