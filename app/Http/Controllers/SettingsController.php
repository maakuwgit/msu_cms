<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use App\Models\Settings;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SettingsController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(){}

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $settings = Settings::all();

        return response()->json($settings);
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function user()
    {
        $user = Auth::user();
        if(!$user) $user = false;

        return response()->json($user);
    }

    /**
     * Display the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $setting = Settings::find($request->get('id'));

        return response()->json($setting);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function setting(Request $request)
    {

        $this->middleware('auth');

        $setting = Settings::find($request->get('id'));
        $setting->value = $request->get('value');
        
        $setting->save();

        return response()->json('Success! Setting updated');
    }

    /**
     * Log the user out of the application.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        Auth::logout();
    
        $request->session()->invalidate();
    
        $request->session()->regenerateToken();
    
        return redirect('/login');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    /*Dev Note: this is stoopid. Its likely remnants of my beginners stage. Updat this for v2.0, since we can specify the key for the logo and update it that way instead*/
    public function logo()
    {
        $this->middleware('auth');

        $label = Settings::find(1);
        $logo = Logo::find(1);
        
        return response()->json([
            'src' => $logo->src,
            'alt' => $logo->alt,
            'label' => $label->value]);
    }

    public function featuredEvent()
    {
        $id = Settings::find(1);
        $event = Event::find($id);
        
        return response()->json($event[0]);
    }
}
