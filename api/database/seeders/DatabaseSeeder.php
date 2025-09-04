<?php

namespace Database\Seeders;

use App\Models\Operacao;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            BancosSeeder::class,
            FormasPagamentoSeeder::class,
            LancamentoSeeder::class,
            OperacaoSeeder::class,
        ]);
    }
}
