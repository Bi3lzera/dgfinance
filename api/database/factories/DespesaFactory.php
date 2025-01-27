<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

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
            'descricao' => $this->faker->sentence(),
            'valor' => $this->faker->numberBetween(10, 100),
            'data' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'idFormaPagamento' => FormaPagamento::factory(),
            'idBanco' => Banco::factory(),
            'idUser' => User::factory(),
        ];
    }
}
