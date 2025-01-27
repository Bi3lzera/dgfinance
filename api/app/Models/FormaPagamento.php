<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FormaPagamento extends Model
{
    use HasFactory;

    protected $fillable = [
        'forma_pagamento'
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
