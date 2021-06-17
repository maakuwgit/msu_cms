<?php

namespace App\Http\Resources;
namespace App\Http\Controllers;

use Illuminate\Support\Facades\Route;
use Auth;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

//Open CMS Routes
Route::get('/cms/continents', [ContinentsController::class, 'active']);
Route::get('/cms/countries', [CountriesController::class, 'active']);
Route::get('/cms/galleries', [GalleriesController::class, 'index']);
Route::get('/cms/media', [MediaController::class, 'index']);
Route::get('/cms/programs', [ProgramsController::class, 'active']);

Route::view('/', 'base');
Route::view('/*/*/', 'base');

//Global Authorization Routes
Auth::routes();

//Admin
Route::view('/resource/{path?}/*', 'admin')->middleware('auth');
Route::view('/admin/{path?}', 'admin')->middleware('auth');
Route::view('/admin/{path?}/{subpath?}', 'admin')->middleware('auth');

//Admin Resources
Route::resources([
    '/resource/programs' => ProgramsController::class,
    '/resource/countries' => CountriesController::class,
    '/resource/continents' => ContinentsController::class,
    '/resource/galleries' => GalleriesController::class,
    '/resource/media' => MediaController::class
]);

Route::get('/resource/settings', [SettingsController::class, 'index']);
Route::put('/setting', [SettingsController::class, 'setting']);