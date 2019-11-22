<?php

namespace App\Http\Controllers;

use App\Staff;
use App\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StaffController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $staff = Staff::all();
        foreach($staff as $member){
            if($member->image){
                $media = Media::where('id', '=', $member->image)->firstOrFail();
                $member['image'] = $media->media_name;
            }
        }
        return $staff->toJson();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $staff = Staff::create([
            'name' => $request->name,
            'role' => $request->role,
            'email' => $request->email,
            'bio' => $request->bio,
            'image' => $request->image
        ]);

        $result = array(
            'message' => 'success',
            'staffInfo' => $staff
        );
        return response()->json($result);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Staff  $staff
     * @return \Illuminate\Http\Response
     */
    public function show(Staff $staff)
    {
        $staff = Staff::all();
        foreach($staff as $member){
            if($member->image){
                $media = Media::where('id', '=', $member->image)->firstOrFail();
                $member['image'] = $media->media_name;
            }
        }
        return view('temp/staff', compact('staff'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Staff  $staff
     * @return \Illuminate\Http\Response
     */
    public function edit(Staff $staff)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Staff  $staff
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Staff $staff)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Staff  $staff
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if(Auth::check()){
            $currentLoggedUser = Auth::user();
            if($currentLoggedUser->hasAnyRole(['Super Admin', 'Admin'])){
                $staff = Staff::findOrFail($id);
                $staff->delete();
                return response('success');
            } else {
                return response('they cant delete');
            }

        } else {
            return response('401');
        }
    }

    public function single($id)
    {
        $staff = Staff::findOrFail($id);
        $media = Media::where('id', '=', $staff->image)->firstOrFail();
        $staff['image'] = $media->media_name;
        return response()->json($staff);
    }
}
