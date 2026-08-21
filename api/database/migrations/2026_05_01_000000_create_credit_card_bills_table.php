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
        Schema::create('credit_card_bills', function (Blueprint $table) {
            $table->id('idBill');
            $table->string('uuidBill');
            $table->unsignedBigInteger('idCard');
            $table->string('billForecastDate');
            $table->date('billClosingDate');
            $table->string('billStatus');
            $table->date('dueDate');
            $table->date('paymentDate');
            $table->string('paymentMode');
            $table->decimal('paymentValue', 8, 2);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('credit_card_bills');
    }
};
