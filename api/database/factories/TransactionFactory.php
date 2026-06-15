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
        $installment = Installment::inRandomOrder()->first() ?? Installment::factory()->create();
        $idUser = $installment->movement->idUser;

        $bankAccount = BankAccount::where('idUser', $idUser)->inRandomOrder()->first()
            ?? BankAccount::factory()->create(['idUser' => $idUser]);

        $paymentCard = UserCard::where('idUser', $idUser)->inRandomOrder()->first()
            ?? UserCard::factory()->create(['idUser' => $idUser]);

        return [
            'idInstallment' => $installment->idInstallment,
            'transactionDescription' => $this->faker->sentence(),
            'value' => $this->faker->randomFloat(2, 10, 1000),
            'date' => $this->faker->dateTimeBetween('-6 months', '-1 months')->format('Y-m-d'),
            'type' => $this->faker->randomElement(['Despesa', 'Receita']),
            'idBankAccount' => $bankAccount->idAccount,
            'idPaymentMethod' => PaymentMethod::inRandomOrder()->first()->idPaymentMethod ?? PaymentMethod::factory(),
            'idPaymentCard' => $paymentCard->idCard,
            'idUser' => $idUser,
        ];
    }
}
