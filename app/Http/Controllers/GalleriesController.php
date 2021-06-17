<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use App\Models\Gallery;
use Illuminate\Http\Request;

class GalleriesController extends Controller
{

    public function parse($galleries)
    {
        foreach ($galleries as $gallery) {
            $gallery->countries;
            $gallery->media;
        }
        return $galleries;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $galleries = Gallery::all();
        return response()->json($this->parse($galleries));
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
        $gallery = new Gallery();

        $gallery->save();

        return response()->json('Gallery successfully created!');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //Can this be bundled for optimization?
        $gallery = Gallery::find($id);
        $galleries = Gallery::all();

        return response()->json($gallery, $galleries);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $gallery = Gallery::find($id);
        $gallery->delete();
        
        return response()->json('Gallery successfully deleted!');
    }
}
