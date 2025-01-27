<?php

namespace Database\Seeders;

use App\Models\Banco;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BancosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Banco::factory()->create(['nome' => 'Carteira']);
        Banco::factory()->create(['nome' => 'Banco do Brasil']);
        Banco::factory()->create(['nome' => 'Nubank']);
        Banco::factory()->create(['nome' => 'Inter']);
        Banco::factory()->create(['nome' => 'Itau']);
    }
}