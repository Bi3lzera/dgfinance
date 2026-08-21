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
            'description' => $this->faker->randomElement($methods),
            'payMethodType' => $this->faker->randomElement(['Digital', 'Physical']),
            'idUser' => $this->faker->randomElement([null, $this->faker->numberBetween(1, 2)]),
        ];
    }
}
