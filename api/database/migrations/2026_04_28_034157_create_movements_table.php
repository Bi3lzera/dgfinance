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
            $table->decimal('totalValue', 10, 2);
            $table->string('type');
            $table->integer('totalInstallments')->nullable();
            $table->string('idCategory')->nullable();
            $table->string('paymentRecurrencyMethod')->nullable(); // A -> Agendado, R -> Recorrente, P -> Parcelado
            $table->string('transferUUID');
            $table->timestamps();

            // Needs to be added after categories
            // $table->foreign('idUser')->references('idUser')->on('users');
            // $table->foreign('idCategory')->references('id')->on('categories');
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
