<?php

namespace App\Services;

use App\Models\Categoria;

class CategoriaService
{
    public function getCategorias(): array
    {
        return Categoria::get()->toArray();
    }
}
