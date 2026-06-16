<?php

namespace Database\Factories;

use App\Models\Bank;
use Illuminate\Database\Eloquent\Factories\Factory;

class BankFactory extends Factory
{
    protected $model = Bank::class;

    public function definition(): array
    {
        $banks = [
            ['name' => 'Banco do Brasil', 'codeCOMPE' => '001'],
            ['name' => 'Banco Santander', 'codeCOMPE' => '033'],
            ['name' => 'Caixa Econômica Federal', 'codeCOMPE' => '104'],
            ['name' => 'Banco Bradesco', 'codeCOMPE' => '237'],
            ['name' => 'Itaú Unibanco', 'codeCOMPE' => '341'],
            ['name' => 'Banco Inter', 'codeCOMPE' => '077'],
            ['name' => 'Nubank', 'codeCOMPE' => '260'],
            ['name' => 'C6 Bank', 'codeCOMPE' => '336'],
            ['name' => 'Banco Safra', 'codeCOMPE' => '074'],
            ['name' => 'Banco BTG Pactual', 'codeCOMPE' => '208'],
        ];

        $bank = $this->faker->randomElement($banks);

        return [
            'name' => $bank['name'],
            'codeCOMPE' => $bank['codeCOMPE'],
        ];
    }
}
