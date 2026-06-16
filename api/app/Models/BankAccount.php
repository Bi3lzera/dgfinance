<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BankAccount extends Model
{
    use HasFactory;

    protected $table = 'users_bank_accounts';
    protected $primaryKey = 'idAccount';

    protected $fillable = [
        'idUser',
        'idBank',
        'agencyNumber',
        'accountNumber',
        'accountAlias',
        'accountType',
        'initialValue',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'idUser');
    }

    public function bank()
    {
        return $this->belongsTo(Bank::class, 'idBank');
    }
}
