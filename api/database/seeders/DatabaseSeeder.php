<?php

namespace Database\Seeders;

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
            CategoriaSeeder::class,
            LancamentoSeeder::class,
            OperacaoSeeder::class,
        ]);
    }
}
