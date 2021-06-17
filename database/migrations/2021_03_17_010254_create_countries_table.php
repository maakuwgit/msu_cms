<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCountriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('countries', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('slug');
            $table->string('name');
            $table->string('code')->default('')->nullable();
            $table->string('color')->default('20');
            $table->string('enabled')->default('on');
            $table->integer('continent_id');
            $table->string('suspended')->default('off');
        });
    }

    public function program_ids()
    {
        return $this->belongsToMany('App\Program');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('countries');
    }
}
