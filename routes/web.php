<?php

namespace App\Http\Resources;
namespace App\Http\Controllers;

use Illuminate\Support\Facades\Route;
use Auth;
use App\Models\User;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::view('/', 'base');
Route::view('/*/*/', 'base');

Route::get('/database', [ScreensController::class, 'alert']);