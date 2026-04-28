<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BankAccount;

class BankAccountSeeder extends Seeder
{
    public function run(): void
    {
        BankAccount::factory(10)->create();
    }
}
