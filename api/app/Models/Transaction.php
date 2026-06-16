<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Transaction extends Model
{
    use HasFactory;

    protected $table = 'transaction';
    protected $primaryKey = 'idTransaction';

    protected $fillable = [
        'idInstallment',
        'transactionDescription',
        'value',
        'date',
        'type',
        'idBankAccount',
        'idPaymentMethod',
        'idPaymentCard',
        'idUser',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'idUser');
    }

    public function installment()
    {
        return $this->belongsTo(Installment::class, 'idInstallment');
    }

    public function bankAccount()
    {
        return $this->belongsTo(BankAccount::class, 'idBankAccount');
    }

    public function paymentMethod()
    {
        return $this->belongsTo(PaymentMethod::class, 'idPaymentMethod');
    }

    public function paymentCard()
    {
        return $this->belongsTo(UserCard::class, 'idPaymentCard');
    }
}
