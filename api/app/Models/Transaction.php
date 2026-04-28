<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Transaction extends Model
{
    use HasFactory;

    protected $table = 'transactions';

    protected $fillable = [
        'idUser',
        'descricao', //Descrição breve do lançamento
        'valor',
        'data', //Data do lançamento, sendo que é diferente das datas de operações, que são os pagamentos efetivos
        'totalParcelas', //Número total de parcelas, as parcelas pagas deverão serem consideradas as pagas na tabela operacao, se parcelado
        'agendado', //Determina se está agendado ou não, S (sim) ou N (não)
        'dataAgendamento', //Data do agendamento, se houver. Matenndo a data mesmo se o lançamento não estiver mais agendado.
        'tipo', //Credito (C) ou Débito (D)
    ];

    // Example relationship method
    public function user()
    {
        return $this->belongsTo(User::class, 'idUser');
    }

    public function banco()
    {
        return $this->belongsTo(Banco::class, 'idBanco');
    }

    public function formaPagamento()
    {
        return $this->belongsTo(FormaPagamento::class, 'idFormaPagamento');
    }
}
