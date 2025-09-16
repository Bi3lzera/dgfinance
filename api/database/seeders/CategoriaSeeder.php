<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Categoria;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Categoria::factory()->create([
            'nome' => 'Restaurante',
            'descricao' => 'itens de restaurante',
        ]);
        Categoria::factory()->create([
            'nome' => 'Combustível',
            'descricao' => 'Etanol, gasolina, diesel, gnv',
        ]);
        Categoria::factory()->create([
            'nome' => 'Supermercado',
            'descricao' => 'itens de supermercado',
        ]);
        Categoria::factory()->create([
            'nome' => 'Farmácia',
            'descricao' => 'itens de farmácia',
        ]);
        Categoria::factory()->create([
            'nome' => 'Lazer',
            'descricao' => 'cinema, teatro, shows, parques',
        ]);
        Categoria::factory()->create([
            'nome' => 'Educação',
            'descricao' => 'escola, faculdade, cursos',
        ]);
        Categoria::factory()->create([
            'nome' => 'Saúde',
            'descricao' => 'consultas, exames, tratamentos',
        ]);
        Categoria::factory()->create([
            'nome' => 'Transporte',
            'descricao' => 'passagens, táxi, aplicativos de transporte',
        ]);
        Categoria::factory()->create([
            'nome' => 'Outros',
            'descricao' => 'outras despesas não categorizadas',
        ]);
    }
}
