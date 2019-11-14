<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });
Route::get('/', 'HomeController@index');

Auth::routes();
Route::get('/logout', 'Auth\LoginController@logout')->name('logout')->middleware('auth');

// Route::get('/home', 'HomeController@index')->name('home');
Route::prefix('admin')->group(function () {
    Route::get('/', 'AdminController@index')->middleware(['web', 'auth']);
    Route::get('/{sub}', 'AdminController@index')->middleware(['web', 'auth']);
    Route::get('/{sub}/{action}', 'AdminController@index')->middleware(['web', 'auth']);
});

Route::delete('users/delete/{id}', 'UserController@destroy');
