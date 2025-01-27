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
        //Cria a tabela receitas que armazenará todas as receitas de todos os usuários.
        Schema::create('receitas', function (Blueprint $table) {
            $table->id(); //id gerada automaticamente
            $table->integer('idUser'); //id do usuário a quem pertence a receita
            $table->string('descricao')->limit(100); //descrição da receita, limitada a 100 caracteres
            $table->double('valor'); //valor da receita ou da parcela daquele mês
            $table->date('data'); //Data da receita; Caso a seja uma receita agendada, este campo poderá ficar em branco.
            $table->integer('idBanco'); //id do banco que debitou o valor
            $table->integer('idFormaPagamento'); //id da forma de pagamento da receita
            $table->integer('parcela'); //Parcela atual
            $table->integer('totalParcelas'); //Total de parcela
            $table->char('agendado'); //Identifica se é uma receita agendada ou não, a classificação se dará: 'S' para Sim, 'N' para Não
            $table->date('dataAgendamento'); //Se for uma receita agendada deverá haver a data estimada para o pagamento
            $table->char('recebido'); //Identifica se a receita foi paga ou nao, a classificação se dará: 'S' para Sim, 'N' para Não; 
                                    //Caso sim, deverá ser informada no cmapo data o dia efetivo do pagamento
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('receitas');
    }
};
