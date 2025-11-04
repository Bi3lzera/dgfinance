<?php

namespace Database\Factories;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserFactory extends Factory
{
    public function definition(): array
    {
        return [
            User::create([
                'name' => fake()->name(),
                'email' => 'insomnia@teste.com',
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
            ]),

            User::create([
                'name' => fake()->name(),
                'email' => 'dev@teste.com',
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
            ])
        ];
    }
}
