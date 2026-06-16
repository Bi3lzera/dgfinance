<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Transfer;
use App\Models\User;
use App\Models\BankAccount;

class TransferFactory extends Factory
{
    protected $model = Transfer::class;

    public function definition(): array
    {
        $idUser = $this->faker->numberBetween(1, 2);
        
        $debtAcc = BankAccount::where('idUser', $idUser)->inRandomOrder()->first()
            ?? BankAccount::factory()->create(['idUser' => $idUser]);
            
        $creditAcc = BankAccount::where('idUser', $idUser)->where('idAccount', '!=', $debtAcc->idAccount)->inRandomOrder()->first()
            ?? BankAccount::factory()->create(['idUser' => $idUser]);

        return [
            'idUser' => $idUser,
            'idDebtAcc' => $debtAcc->idAccount,
            'idCreditAcc' => $creditAcc->idAccount,
            'value' => $this->faker->randomFloat(2, 10, 1000),
            'description' => $this->faker->sentence(),
            'date' => $this->faker->dateTimeBetween('-6 months', '+12 months')->format('Y-m-d'),
        ];
    }
}
