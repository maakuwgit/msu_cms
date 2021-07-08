<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use App\Models\CountriesPrograms;

use Illuminate\Http\Request;

class CountriesProgramsController extends Controller
{
    //

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $programs = CountriesPrograms::all();
        
        return response()->json($programs);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $programs = new CountriesPrograms([
            'countries_id' => $request->get('countries_id'), 
            'programs_id' => $request->get('programs_id')
        ]);

        $programs->save();

        return response()->json($programs);
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

        $programs = CountriesPrograms::find($id);
        $programs->countries_id = $request->get('countries_id');
        $programs->programs_id = $request->get('programs_id');

        $programs->save();
        return response()->json($programs);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $continent = CountriesPrograms::find($id);
        $continent->delete();
        
        return response()->json('Country/Program relationship successfully deleted!');
    }
}
