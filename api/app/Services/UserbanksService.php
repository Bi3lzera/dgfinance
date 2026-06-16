<?php

namespace App\Services;

use App\Models\BankAccount;
use Illuminate\Support\Facades\Auth;

class UserbanksService
{
    //Função para retornar todos os bancos do usuário autenticado.
    public function getAllUserbanks(): array
    {
        return BankAccount::where('users_bank_accounts.idUser', Auth::id())
            ->join('banks', 'users_bank_accounts.idBank', '=', 'banks.idBank')
            ->select(
                'users_bank_accounts.idAccount',
                'users_bank_accounts.idUser',
                'users_bank_accounts.idBank',
                'users_bank_accounts.accountNumber',
                'users_bank_accounts.accountAlias',
                'banks.name as bankName'
            )
            ->orderBy('bankName', 'asc')
            ->get()
            ->toArray();
    }
}
