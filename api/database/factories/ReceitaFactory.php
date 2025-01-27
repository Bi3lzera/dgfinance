<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Receita>
 */
class ReceitaFactory extends Factory
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
            'idBanco' => Banco::factory(),
            'idFormaPagamento' => FormaPagamento::factory(),
            'idUser' => User::factory(),
        ];
    }
}
