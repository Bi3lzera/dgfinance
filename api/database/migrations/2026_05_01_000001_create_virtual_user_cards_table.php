<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('virtual_user_cards', function (Blueprint $table) {
            $table->id('idVirtualCard');
            $table->unsignedBigInteger('idMainCard');
            $table->string('finalCardNumber');
            $table->string('description');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('virtual_user_cards');
    }
};
