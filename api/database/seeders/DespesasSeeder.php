<?php

namespace Database\Seeders;

use App\Models\Despesa;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DespesasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Despesa::factory()->count(100)->create();
    }
}
