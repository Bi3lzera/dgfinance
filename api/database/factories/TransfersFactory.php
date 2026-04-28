<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Transfers;
use App\Models\User;
use App\Models\BankAccount;

class TransfersFactory extends Factory
{
    protected $model = Transfers::class;

    public function definition(): array
    {
        return [
            'idUser' => User::inRandomOrder()->first()->idUser ?? 1,
            'idDebtAcc' => BankAccount::inRandomOrder()->first()->idAccount ?? BankAccount::factory(),
            'idCreditAcc' => BankAccount::inRandomOrder()->first()->idAccount ?? BankAccount::factory(),
            'value' => $this->faker->randomFloat(2, 10, 1000),
            'description' => $this->faker->sentence(),
            'date' => $this->faker->dateTimeBetween('-6 months', '+12 months')->format('Y-m-d'),
        ];
    }
}
