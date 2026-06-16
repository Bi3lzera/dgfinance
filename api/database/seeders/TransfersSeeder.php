<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Transfer;

class TransfersSeeder extends Seeder
{
    public function run(): void
    {
        Transfer::factory(10)->create();
    }
}
