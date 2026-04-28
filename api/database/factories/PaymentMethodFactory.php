<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\PaymentMethod;
use App\Models\User;

class PaymentMethodFactory extends Factory
{
    protected $model = PaymentMethod::class;

    public function definition(): array
    {
        $methods = [
            'Pix',
            'Cartão de Crédito',
            'Cartão de Débito',
            'Dinheiro',
            'Boleto',
            'Transferência Bancária'
        ];

        return [
            'title' => $this->faker->randomElement($methods),
            'idUser' => $this->faker->randomElement([null, User::inRandomOrder()->first()->idUser ?? 1]),
        ];
    }
}
