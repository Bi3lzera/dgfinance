<?php

namespace Database\Seeders;

use App\Models\Receita;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReceitasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Receita::factory()->count(100)->create();
    }
}