<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Banco extends Model
{
    protected $fillable = [
        'nome',
    ];

    public function despesas()
    {
        return $this->hasMany(Despesa::class);
    }

    public function receitas()
    {
        return $this->hasMany(Receita::class);
    }
}
