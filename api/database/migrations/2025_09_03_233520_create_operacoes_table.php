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
            $table->integer('idLancamento'); //id do lançamento ao qual a operação pertence
            $table->char('operacao'); //Tipo da operação D (débito) ou C (Crédito)
            $table->double('valorOperacao'); //Valor pago na operação, que pode
            $table->integer('parcelaOperacao')->default(1); //Número da parcela paga, se for o caso
            $table->date('dataOperacao'); //Data em que a operação foi realizada
            
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
