<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Operacao extends Model
{
    use HasFactory;

    protected $table = 'operacoes';

    protected $fillable = [
        'idLancamento',
        'operacao', // 'C' para crédito, 'D' para débito.
        'valorOperacao',
        'parcelaOperacao', // número da parcela, se aplicável
        'dataOperacao',
        'idBanco',
        'idFormaPagamento' // data da operação
    ];

    public function operacao()
    {
        return $this->hasMany(Lancamento::class, 'idLancamento');
    }
}
