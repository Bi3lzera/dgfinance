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
            'totalValue' => $this->faker->randomFloat(2, 50, 2000),
            'type' => $this->faker->randomElement(['Despesa', 'Receita']),
            'totalInstallments' => $this->faker->numberBetween(1, 12),
            'idCategory' => Category::inRandomOrder()->first()->id ?? Category::factory(),
            'paymentRecurrencyMethod' => $this->faker->randomElement(['A','R','P', '']), // A -> Agendado, R -> Recorrente, P -> Parcelado
            'transferUUID' => $this->faker->uuid(),
        ];
    }
}
