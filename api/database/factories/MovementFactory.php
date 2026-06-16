<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Movement;
use App\Models\User;
use App\Models\Category;

class MovementFactory extends Factory
{
    protected $model = Movement::class;

    public function definition(): array
    {
        return [
            'idUser' => $this->faker->numberBetween(1, 2),
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->sentence(),
            'initialValue' => $this->faker->randomFloat(2, 50, 2000),
            'type' => $this->faker->randomElement(['Despesa', 'Receita']),
            'totalPaymentCount' => $this->faker->numberBetween(1, 12),
            'idCategory' => Category::inRandomOrder()->first()->idCategory ?? Category::factory(),
            'date' => $this->faker->dateTimeBetween('-6 months', '+12 months')->format('Y-m-d'),
            'paymentRecurrencyMethod' => $this->faker->randomElement(['A','R','P', '']), // A -> Agendado, R -> Recorrente, P -> Parcelado
        ];
    }
}
