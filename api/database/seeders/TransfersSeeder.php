<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Transfers;

class TransfersSeeder extends Seeder
{
    public function run(): void
    {
        Transfers::factory(10)->create();
    }
}
