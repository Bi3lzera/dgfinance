<?php

namespace Database\Factories;

use App\Models\Transaction;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\UserCard;
use App\Models\BankAccount;
use App\Models\PaymentMethod;
use App\Models\Installment;

class TransactionFactory extends Factory
{
    protected $model = Transaction::class;

    public function definition(): array
    {
        return [
            'idInstallment' => Installment::inRandomOrder()->first()->idInstallment ?? Installment::factory(),
            'transactionDescription' => $this->faker->sentence(),
            'value' => $this->faker->randomFloat(2, 10, 1000),
            'date' => $this->faker->dateTimeBetween('-6 months', '+12 months')->format('Y-m-d'),
            'type' => $this->faker->randomElement(['Despesa', 'Receita']),
            'idBankAccount' => BankAccount::inRandomOrder()->first()->idAccount ?? BankAccount::factory(),
            'idPaymentMethod' => PaymentMethod::inRandomOrder()->first()->idPaymentMethod ?? PaymentMethod::factory(),
            'idPaymentCard' => UserCard::inRandomOrder()->first()->idCard ?? UserCard::factory(),
            'idUser' => $this->faker->numberBetween(1, 2),
        ];
    }
}
