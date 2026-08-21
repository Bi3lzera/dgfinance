<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
use App\Models\UserCard;

class VirtualUserCardSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();
        $cards = [];

        for ($i = 0; $i < 10; $i++) {
            $cards[] = [
                'idMainCard' => UserCard::inRandomOrder()->first()->idCard ?? 1,
                'finalCardNumber' => $faker->numberBetween(1000, 9999),
                'description' => $faker->word(),
            ];
        }

        DB::table('virtual_user_cards')->insert($cards);
    }
}
