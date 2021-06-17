<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use App\Models\Media;

use Illuminate\Http\Request;


class MediaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $media = Media::all();
        return response()->json($media);
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
            'url' => 'url',
            'gallery_id' => 'nullable'
        ]);

        $media = new Media;
        $media->url = $request->get('url');
        $media->type = $request->get('type');
        $media->gallery_id = $request->get('gallery_id');

        $media->save();
        return response()->json($media->id);
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
            'url' => 'nullable',
            'gallery_id' => 'nullable'
        ]);

        $media = Media::find($id);
        $media->url = $request->get('url');
        $media->type = $request->get('type');
        $media->gallery_id = $request->get('gallery_id');

        $media->save();
        return response()->json($media->name+' successfully updated!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $media = Media::find($id);
        $media->delete();

        return response()->json('Media successfully deleted');
    }
}