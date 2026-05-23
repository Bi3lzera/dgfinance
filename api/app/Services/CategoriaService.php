<?php

namespace App\Services;

use App\Models\Category;

class CategoriaService
{
    public function getAllCategories(): array
    {
        $categories = Category::all();

        return $categories->map(function ($category) {
            return [
                'idCategory' => $category->idCategory,
                'title' => $category->title,
            ];
        })->toArray();
    }
}
