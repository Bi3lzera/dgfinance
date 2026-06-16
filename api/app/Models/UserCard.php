<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserCard extends Model
{
    use HasFactory;

    protected $table = 'users_cards';
    protected $primaryKey = 'idCard';

    protected $fillable = [
        'idUser',
        'idBank',
        'idAccount',
        'finalCardNumber',
        'cardAlias',
        'expirationDate',
        'defaultPaymentMethod',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'idUser');
    }

    public function bank()
    {
        return $this->belongsTo(Bank::class, 'idBank');
    }

    public function account()
    {
        return $this->belongsTo(BankAccount::class, 'idAccount');
    }
}
