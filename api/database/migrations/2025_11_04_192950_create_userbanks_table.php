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
        Schema::create('userbanks', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idUser')->foreignId('users.id');
            $table->unsignedBigInteger('idBanco')->foreignId('bancos.id');
            $table->string('accountNumber')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('userbanks');
    }
};
