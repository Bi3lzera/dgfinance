<?php

namespace Database\Factories;

use App\Models\Bank;
use Illuminate\Database\Eloquent\Factories\Factory;

class BankFactory extends Factory
{
    protected $model = Bank::class;

    protected static ?array $banks = null;

    /**
     * Carrega e mapeia dinamicamente todos os bancos do arquivo Bancos.json,
     * utilizando estritamente os campos previstos na migration de banks (name e codeCOMPE).
     */
    public static function loadBanksFromJson(): array
    {
        if (self::$banks !== null) {
            return self::$banks;
        }

        $possiblePaths = [
            base_path('../.documents/Bancos.json'),
            dirname(base_path()) . '/.documents/Bancos.json',
            base_path('.documents/Bancos.json'),
            base_path('database/data/Bancos.json'),
        ];

        $jsonContent = null;
        foreach ($possiblePaths as $path) {
            if (file_exists($path)) {
                $jsonContent = file_get_contents($path);
                break;
            }
        }

        if ($jsonContent !== null) {
            $data = json_decode($jsonContent, true);

            if (is_array($data)) {
                self::$banks = array_values(array_filter(array_map(function ($item) {
                    return [
                        'name' => $item['LongName'] ?? $item['ShortName'] ?? null,
                        'codeCOMPE' => $item['COMPE'] ?? null,
                    ];
                }, $data), function ($bank) {
                    return !empty($bank['name']) && !empty($bank['codeCOMPE']);
                }));
            }
        }

        // Fallback preventivo caso o arquivo JSON não seja encontrado
        if (empty(self::$banks)) {
            self::$banks = [
                ['name' => 'Banco do Brasil S.A.', 'codeCOMPE' => '001'],
                ['name' => 'Banco Santander (Brasil) S.A.', 'codeCOMPE' => '033'],
                ['name' => 'Caixa Econômica Federal', 'codeCOMPE' => '104'],
                ['name' => 'Banco Bradesco S.A.', 'codeCOMPE' => '237'],
                ['name' => 'Itaú Unibanco S.A.', 'codeCOMPE' => '341'],
                ['name' => 'Banco Inter S.A.', 'codeCOMPE' => '077'],
                ['name' => 'Nubank', 'codeCOMPE' => '260'],
                ['name' => 'C6 Bank', 'codeCOMPE' => '336'],
            ];
        }

        return self::$banks;
    }

    public function definition(): array
    {
        $banks = self::loadBanksFromJson();
        $bank = $this->faker->randomElement($banks);

        return [
            'name' => $bank['name'],
            'codeCOMPE' => $bank['codeCOMPE'],
        ];
    }
}
