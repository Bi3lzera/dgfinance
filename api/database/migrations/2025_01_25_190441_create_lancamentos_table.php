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
        //Cria a tabela despesas que armazenará todas as despesas de todos os usuários.
        Schema::create('lancamentos', function (Blueprint $table) {
            $table->id(); //id gerada automaticamente
            $table->unsignedBigInteger('idUser'); //id do usuário a quem pertence a despesa
            $table->foreign('idUser')->references('id')->on('users');
            $table->string('descricao')->limit(45); //descrição da despesa, limitada a 100 caracteres
            $table->string('descricaoDetalhada')->limit(250)->nullable(); //descrição detalhada da despesa
            $table->double('valor'); //valor da despesa ou da parcela daquele mês
            $table->date('dataLancamento'); //Data da despesa; Caso a seja uma despesa agendada, este campo poderá ficar em branco.
            $table->integer('totalParcelas')->default(1); //Total de parcela
            $table->char('agendado')->nullable(); //Identifica se é uma despesa agendada ou não, a classificação se dará: 'S' para Sim, 'N' para Não
            $table->date('dataAgendamento')->nullable(); //Se for uma despesa agendada deverá haver a data estimada para o pagamento
            $table->char('tipo'); //Crédito (C) ou Débito (D)

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lancamentos');
    }
};
