<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\UserCard;

class UserCardSeeder extends Seeder
{
    public function run(): void
    {
        UserCard::factory(10)->create();
    }
}
