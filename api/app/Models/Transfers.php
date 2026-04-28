<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transfers extends Model
{
    use HasFactory;

    protected $table = 'transfers';
    protected $primaryKey = 'idTransfer';

    protected $fillable = [
        'idUser',
        'idDebtAcc',
        'idCreditAcc',
        'value',
        'description',
        'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'idUser');
    }

    public function debtAccount()
    {
        return $this->belongsTo(BankAccount::class, 'idDebtAcc');
    }

    public function creditAccount()
    {
        return $this->belongsTo(BankAccount::class, 'idCreditAcc');
    }
}
