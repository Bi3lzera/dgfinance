<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Category;
use App\Models\User;

class CategoryFactory extends Factory
{
    protected $model = Category::class;

    public function definition(): array
    {
        $userId = $this->faker->numberBetween(1, 2);

        $categories = [
            ['title' => 'Alimentação', 'type' => 'Despesa', 'idUser' => null],
            ['title' => 'Transporte', 'type' => 'Despesa', 'idUser' => null],
            ['title' => 'Moradia', 'type' => 'Despesa', 'idUser' => null],
            ['title' => 'Lazer', 'type' => 'Despesa', 'idUser' => $userId],
            ['title' => 'Salário', 'type' => 'Receita', 'idUser' => null],
            ['title' => 'Freelance', 'type' => 'Receita', 'idUser' => $userId],
            ['title' => 'Educação', 'type' => 'Despesa', 'idUser' => null],
        ];

        $category = $this->faker->randomElement($categories);

        return [
            'title' => $category['title'],
            'type' => $category['type'],
            'idUser' => $category['idUser'],
        ];
    }
}
