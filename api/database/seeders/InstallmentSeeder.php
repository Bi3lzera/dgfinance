<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Installment;

class InstallmentSeeder extends Seeder
{
    public function run(): void
    {
        Installment::factory(1000)->create();
    }
}
