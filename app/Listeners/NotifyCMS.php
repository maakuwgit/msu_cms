<?php

namespace App\Listeners;

use App\Events\ScreenAdded;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class NotifyCMS
{   
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  ScreenAdded $event
     * @return void
     */
    public function handle(ScreenAdded $screen)
    {
        //
        //ScreenAdded::dispatch('new screen');
    }
}
