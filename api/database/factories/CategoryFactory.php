<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Category;
use Illuminate\Support\Facades\File;

class CategoryFactory extends Factory
{
    protected $model = Category::class;

    public function definition(): array
    {
        $json = File::get(base_path('../.documents/Categories By Malvo.json'));
        $data = json_decode($json, true);
        $item = $this->faker->randomElement($data['results']);

        return [
            'id' => $item['id'],
            'description' => $item['description'],
            'descriptionTranslated' => $item['descriptionTranslated'] ?? null,
            'parentId' => $item['parentId'] ?? null,
        ];
    }
}
