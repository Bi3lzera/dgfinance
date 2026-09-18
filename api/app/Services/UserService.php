<?php

namespace App\Services;
use Illuminate\Support\Facades\Auth;
use App\Models\PaymentMethod;
use App\Models\BankAccount;

class UserService
{
    public function getPaymentMethods(): array
    {
        return PaymentMethod::where(function ($query) {
            $query->where('idUser', Auth::id())
                  ->orWhereNull('idUser');
        })
        ->select('idPayMethod as idPaymentMethod', 'description', 'description as title')
        ->get()
        ->toArray();
    }
}
