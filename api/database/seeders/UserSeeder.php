<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\User::create([
            'name' => fake()->name(),
            'email' => 'insomnia@teste.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
        ]);

        \App\Models\User::create([
            'name' => fake()->name(),
            'email' => 'dev@teste.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
        ]);
    }
}
