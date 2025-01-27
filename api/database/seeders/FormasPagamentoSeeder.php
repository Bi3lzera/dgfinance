<?php

namespace Database\Seeders;

use App\Models\FormaPagamento;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FormasPagamentoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        FormaPagamento::factory()->create(['nome' => 'Dinheiro']);
        FormaPagamento::factory()->create(['nome' => 'Cartão de Crédito']);
        FormaPagamento::factory()->create(['nome' => 'Cartão de Débito']);
        FormaPagamento::factory()->create(['nome' => 'Transferência (Pix)']);
    }
}
