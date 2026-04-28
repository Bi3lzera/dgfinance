<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\BankAccount;
use App\Models\User;
use App\Models\Bank;

class BankAccountFactory extends Factory
{
    protected $model = BankAccount::class;

    public function definition(): array
    {
        return [
            'idUser' => User::inRandomOrder()->first()->idUser ?? 1,
            'idBank' => Bank::inRandomOrder()->first()->idBank ?? Bank::factory(),
            'agencyNumber' => $this->faker->numberBetween(1000, 9999),
            'accountNumber' => $this->faker->numberBetween(10000, 99999),
            'accountAlias' => $this->faker->word(),
            'accountType' => $this->faker->randomElement(['Corrente', 'Poupanca', 'Investimento']),
            'initialValue' => $this->faker->randomFloat(2, 0, 5000),
        ];
    }
}
