<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Categoria extends Model
{
    use HasFactory;

    protected $table = 'categorias';

    protected $filltable = [
        'nome',
        'descricao',
    ];

    public function categoria()
    {
        return $this->hasMany(lancamento::class);
    }
}
