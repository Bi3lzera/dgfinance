<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Banco extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
    ];

    public function lancamentos()
    {
        return $this->hasMany(lancamento::class, 'idBanco');
    }
}
