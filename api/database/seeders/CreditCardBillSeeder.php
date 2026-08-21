<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
use App\Models\UserCard;

class CreditCardBillSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create();
        $bills = [];

        for ($i = 0; $i < 20; $i++) {
            $bills[] = [
                'uuidBill' => $faker->uuid(),
                'idCard' => UserCard::inRandomOrder()->first()->idCard ?? 1,
                'billForecastDate' => $faker->date(),
                'billClosingDate' => $faker->date(),
                'billStatus' => $faker->randomElement(['Open', 'Closed', 'Paid']),
                'dueDate' => $faker->date(),
                'paymentDate' => $faker->date(),
                'paymentMode' => $faker->randomElement(['Auto', 'Manual']),
                'paymentValue' => $faker->randomFloat(2, 50, 5000),
            ];
        }

        DB::table('credit_card_bills')->insert($bills);
    }
}
