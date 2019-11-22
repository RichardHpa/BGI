<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('info', 'InfoController@index');

Route::get('users', 'UserController@index');
Route::post('users/add', 'UserController@store');


Route::get('media', 'MediaController@index');
Route::get('media/{id}', 'MediaController@show');
Route::post('media', 'MediaController@store');

Route::get('pages', 'PageController@index');
Route::post('pages/add', 'PageController@store');
Route::get('page/{id}', 'PageController@edit');
Route::post('pages/edit/{id}', 'PageController@update');

Route::get('staff/single/{id}', 'StaffController@single');
Route::get('staff', 'StaffController@index');
Route::post('staff/add', 'StaffController@store');
