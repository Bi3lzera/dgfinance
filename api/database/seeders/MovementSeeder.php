<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Movement;

class MovementSeeder extends Seeder
{
    public function run(): void
    {
        Movement::factory(1000)->create();
    }
}
