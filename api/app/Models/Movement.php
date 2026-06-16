<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movement extends Model
{
    use HasFactory;

    protected $table = 'movements';
    protected $primaryKey = 'idMovement';

    protected $fillable = [
        'idUser',
        'title',
        'description',
        'initialValue',
        'type',
        'totalPaymentCount',
        'idCategory',
        'date',
        'paymentRecurrencyMethod', // Forma como o pagamento será feito, 'unico','recorrente','parcelado'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'idUser');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'idCategory');
    }
}
