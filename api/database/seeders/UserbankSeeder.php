<?php

namespace Database\Seeders;

use App\Models\Userbank;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserbankSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Userbank::factory()->count(10)->create();
    }
}
