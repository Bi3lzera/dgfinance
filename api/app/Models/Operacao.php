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
        'valor',
        'parcela', // número da parcela, se aplicável
        'data' // data da operação
    ];

    public function operacao()
    {
        return $this->hasMany(Lancamento::class, 'idLancamento');
    }
}
