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
        Schema::create('users_cards', function (Blueprint $table) {
            $table->id('idCard');
            $table->unsignedBigInteger('idUser');
            $table->unsignedBigInteger('idBank')->nullable();
            $table->unsignedBigInteger('idAccount')->nullable();
            $table->integer('finalCardNumber')->nullable();
            $table->string('cardAlias')->nullable();
            $table->date('expirationDate')->nullable();
            $table->integer('defaultPaymentMethod')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users_cards');
    }
};
