<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Installment;
use App\Models\Movement;

class InstallmentFactory extends Factory
{
    protected $model = Installment::class;

    public function definition(): array
    {
        return [
            'idMovement' => Movement::inRandomOrder()->first()->idMovement ?? Movement::factory(),
            'plannedDate' => $this->faker->dateTimeBetween('-6 months', '+12 months')->format('Y-m-d'),
            'expectedValue' => $this->faker->randomFloat(2, 10, 500),
            'installmentNumber' => $this->faker->numberBetween(1, 12),
            'status' => $this->faker->randomElement(['Pendente', 'Pago']),
        ];
    }
}
