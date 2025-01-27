<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Despesa extends Model
{
    protected $table = 'despesas';

    protected $fillable = [
        'idUser',
        'descricao',
        'valor',
        'data',
        'idBanco',
        'idFormaPagamento',
        'parcela',
        'totalParcelas',
        'agendado',
        'dataAgendamento',
        'pago'
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
