<?php

namespace App\Services;
use Illuminate\Support\Facades\Auth;
use App\Models\PaymentMethod;
use App\Models\BankAccount;

class UserService
{
    public function getPaymentMethods(): array
    {
        return PaymentMethod::where('idUser', Auth::id())
        ->select('idPayMethod as idPaymentMethod', 'title')
        ->get()
        ->toArray();
    }
}
