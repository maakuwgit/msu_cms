<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Programs;
use App\Models\Countries;
use Illuminate\Http\Request;

class ProgramsController extends Controller
{

    public function parse($programs)
    {
        foreach ($programs as $program) {
            $program->countries;
        }
        return $programs;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $programs = Programs::all();
        
        return response()->json($this->parse($programs));
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function active()
    {
        $programs = Programs::where('suspended', '=', 'off')->get();
        
        return response()->json($this->parse($programs));
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
            'name' => 'required'
        ]);

        $program = new Programs([
            'name' => $request->get('name'),
            'semester' => $request->get('semester'),
            'suspended' => $request->get('suspended')
        ]);

        $program->save();

        return response()->json($program->id);
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
            'name' => 'required'
        ]);

        $program = Programs::find($id);
        $program->name = $request->get('name');
        $program->semester = $request->get('semester');
        $program->suspended = $request->get('suspended');

        foreach($request->get('countries') as $c){
            $country = Countries::find($c);
            $program->countries()->detach();
            $program->countries()->attach($country->id);
        }

        $program->save();
        return response()->json($program);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $program = Programs::find($id);
        $program->delete();
        
        return response()->json('Program successfully deleted!');
    }
}
