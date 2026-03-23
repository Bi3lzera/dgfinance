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
        Schema::create('operacoes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idLancamento'); //id do lançamento ao qual a operação pertence
            $table->foreign('idLancamento')->references('id')->on('lancamentos');
            $table->char('operacao'); //Tipo da operação D (débito) ou C (Crédito)
            $table->double('valorOperacao'); //Valor pago na operação, que pode
            $table->integer('parcelaOperacao')->default(1); //Número da parcela paga, se for o caso
            $table->date('dataOperacao'); //Data em que a operação foi realizada
            $table->unsignedBigInteger('idBanco')->nullable(); //id do banco que debitou o valor
            $table->foreign('idBanco')->references('id')->on('bancos');
            $table->unsignedBigInteger('idFormaPagamento')->nullable(); //id da forma de pagamento da despesa
            $table->foreign('idFormaPagamento')->references('id')->on('forma_pagamentos');


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('operacoes');
    }
};
