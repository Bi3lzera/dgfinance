<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Receita extends Model
{
use HasFactory;
protected $table = 'receitas';

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
    'recebido',
];

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
