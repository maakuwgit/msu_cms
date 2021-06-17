<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use App\Models\Continent;

use Illuminate\Http\Request;

class ContinentsController extends Controller
{

    public function parse($continents)
    {
        foreach ($continents as $continent) {
            $continent->countries;
        }
        return $continents;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $continents = Continent::all();
        return response()->json($this->parse($continents));
    }

    /**
     * Display a listing of ONLY the enabled Continents.
     *
     * @return \Illuminate\Http\Response
     */
    public function active()
    {
        $continents = Continent::where('enabled','=','on')->get();
        
        return response()->json($this->parse($continents));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'slug' => 'required',
            'name' => 'required'
        ]);

        $continent = new Continent([
            'slug' => $request->get('slug'),
            'name' => $request->get('name'),
            'enabled' => $request->get('enabled')
        ]);

        $continent->save();

        return response()->json('Continent successfully created!');
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
        $request->validate([
            'name' => 'required',
            'slug' => 'required'
        ]);

        $continent = Continent::find($id);
        $continent->name = $request->get('name');
        $continent->slug = $request->get('slug');
        $continent->enabled = $request->get('enabled');

        $continent->save();
        return response()->json('Continent successfully updated!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $continent = Continent::find($id);
        $continent->delete();
        
        return response()->json('Continent successfully deleted!');
    }
}
