<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transaction', function (Blueprint $table) {
            $table->id('idTransaction');
            $table->unsignedBigInteger('idInstallment')->nullable();
            $table->string('transactionDescription')->nullable();
            $table->decimal('value', 10, 2);
            $table->date('date');
            $table->string('type');
            $table->unsignedBigInteger('idBankAccount');
            $table->unsignedBigInteger('idPaymentMethod');
            $table->unsignedBigInteger('idPaymentCard')->nullable();
            $table->unsignedBigInteger('idUser');
            $table->timestamps();

            // Uncomment these when foreign keys are strictly checked:
            // $table->foreign('idInstallment')->references('idInstallment')->on('installments');
            // $table->foreign('idBankAccount')->references('idAccount')->on('users_bank_accounts');
            // $table->foreign('idPaymentMethod')->references('idPayMethod')->on('payment_methods');
            // $table->foreign('idPaymentCard')->references('idCard')->on('users_cards');
            // $table->foreign('idUser')->references('idUser')->on('users');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transaction');
    }
};
