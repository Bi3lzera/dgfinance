<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CreditCardBill extends Model
{
    use HasFactory;

    protected $table = 'credit_card_bills';
    protected $primaryKey = 'idBill';
    public $timestamps = false;

    protected $fillable = [
        'uuidBill',
        'idCard',
        'billForecastDate',
        'billClosingDate',
        'billStatus',
        'dueDate',
        'paymentDate',
        'paymentMode',
        'paymentValue',
    ];

    public function card()
    {
        return $this->belongsTo(UserCard::class, 'idCard');
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class, 'idBill');
    }
}
