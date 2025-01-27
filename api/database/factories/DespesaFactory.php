<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Banco;
use App\Models\User;
use App\Models\FormaPagamento;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Despesa>
 */
class DespesaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'descricao' => $this->faker->sentence(6),
            'valor' => $this->faker->randomFloat(2, 0, 10000),
            'data' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'idBanco' => Banco::all()->random()->id,
            'idFormaPagamento' => FormaPagamento::all()->random()->id,
            'idUser' => User::all()->random()->id,
            'parcela' => $this->faker->numberBetween(1, 12),
            'totalParcelas' => $this->faker->numberBetween(1, 12),
        ];
    }
}
