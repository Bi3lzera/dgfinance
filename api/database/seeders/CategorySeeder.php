<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $json = File::get(base_path('../.documents/Categories By Malvo.json'));
        $data = json_decode($json, true);
        
        $categories = [];
        foreach ($data['results'] as $item) {
            $categories[] = [
                'id' => $item['id'],
                'description' => $item['description'],
                'descriptionTranslated' => $item['descriptionTranslated'] ?? null,
                'parentId' => $item['parentId'] ?? null,
                'created_at' => now()->toDateTimeString(),
                'updated_at' => now()->toDateTimeString(),
            ];
        }

        DB::table('categories')->insert($categories);
    }
}
