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
        Schema::create('movements', function (Blueprint $table) {
            $table->id('idMovement');
            $table->unsignedBigInteger('idUser');
            $table->string('title');
            $table->string('description');
            $table->decimal('initialValue', 10, 2);
            $table->string('type');
            $table->integer('totalPaymentCount')->nullable();
            $table->unsignedBigInteger('idCategory')->nullable();
            $table->date('date');
            $table->string('paymentRecurrencyMethod')->nullable(); // A -> Agendado, R -> Recorrente, P -> Parcelado
            $table->timestamps();

            // Needs to be added after categories
            // $table->foreign('idUser')->references('idUser')->on('users');
            // $table->foreign('idCategory')->references('idCategory')->on('categories');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movements');
    }
};
