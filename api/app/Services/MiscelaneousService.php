<?php

namespace App\Services;

use App\Models\Bank;

class MiscelaneousService
{
    public function getBanks(): array
    {
        $banks = Bank::all();

        return $banks->map(function ($bank) {
            return [
                'idBank' => $bank->idBank,
                'name' => $bank->name,
            ];
        })->toArray();
    }
}
