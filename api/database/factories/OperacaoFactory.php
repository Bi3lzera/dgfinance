<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Operacao>
 */
class OperacaoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $lancamento = \App\Models\Lancamento::all()->random();

        return [
            'idLancamento' => $lancamento->id,
            'dataOperacao' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'valorOperacao' => $lancamento->valor,
            'parcelaOperacao' => $this->faker->numberBetween(1, 1),
            'operacao' => $this->faker->randomElement(['C', 'D']),
        ];
    }
}
