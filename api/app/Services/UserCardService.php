<?php

namespace App\Services;

use App\Models\UserCard;
use Illuminate\Support\Facades\Auth;

class UserCardService 
{
    public function getUserCardList(): array
    {
        return UserCard::where('users_cards.idUser', Auth::id())
            ->join('banks', 'users_cards.idBank', '=', 'banks.idBank')
            ->select(
                'users_cards.idCard',
                'users_cards.idUser',
                'users_cards.idBank',
                'users_cards.idAccount',
                'users_cards.finalCardNumber',
                'users_cards.cardAlias',
                'users_cards.defaultPaymentMethod',
                'banks.name as bankName'
            )
            ->orderBy('bankName', 'asc')
            ->get()
            ->toArray();
    }
}