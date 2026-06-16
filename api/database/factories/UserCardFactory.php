<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\UserCard;
use App\Models\User;
use App\Models\Bank;
use App\Models\BankAccount;

class UserCardFactory extends Factory
{
    protected $model = UserCard::class;

    public function definition(): array
    {
        $idUser = $this->faker->numberBetween(1, 2);
        
        $bankAccount = BankAccount::where('idUser', $idUser)->inRandomOrder()->first()
            ?? BankAccount::factory()->create(['idUser' => $idUser]);

        return [
            'idUser' => $idUser,
            'idBank' => Bank::inRandomOrder()->first()->idBank ?? Bank::factory(),
            'idAccount' => $bankAccount->idAccount,
            'finalCardNumber' => $this->faker->numberBetween(1000, 9999),
            'cardAlias' => $this->faker->word(),
            'expirationDate' => $this->faker->dateTimeBetween('-6 months', '+12 months')->format('Y-m-d'),
            'defaultPaymentMethod' => $this->faker->numberBetween(1, 2),
        ];
    }
}
