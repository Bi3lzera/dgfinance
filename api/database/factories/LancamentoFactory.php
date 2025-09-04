<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Banco;
use App\Models\User;
use App\Models\FormaPagamento;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Despesa>
 */
class LancamentoFactory extends Factory
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
            'totalParcelas' => $this->faker->numberBetween(1, 12),
            'agendado' => $this->faker->randomElement(['S', 'N']),
            'dataAgendamento' => $this->faker->dateTimeBetween('now', '+1 year'),
            'tipo' => $this->faker->randomElement(['C', 'D']) // Crédito (C) ou Débito (D)
        ];
    }
}
