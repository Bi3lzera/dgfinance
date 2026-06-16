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
            BankSeeder::class,
            BankAccountSeeder::class,
            PaymentMethodSeeder::class,
            UserCardSeeder::class,
            CategorySeeder::class,
            MovementSeeder::class,
            InstallmentSeeder::class,
            TransfersSeeder::class,
            TransactionSeeder::class,
        ]);
    }
}
