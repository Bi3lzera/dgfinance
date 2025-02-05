<?php

namespace App\Services;

use App\Models\Receita;
use Illuminate\Http\Response;

class ReceitaService
{
    public function createReceita(array $data): Response
    {
        Receita::create($data);
        return new Response(['message' => 'Receita criada com sucesso.'], Response::HTTP_CREATED);
    }

    public function getAllReceitas(): array
    {
        return Receita::where('idUser', auth()->user()->id)->get()->toArray();
    }

    public function getReceita(int $id): Receita
    {
        return Receita::where('id', $id)->where('idUser', auth()->user()->id)->first();
    }

    public function updateReceita(array $data, int $id): Response
    {
        Receita::where('id', $id)->where('idUser', auth()->user()->id)->update($data);
        return new Response(['message' => 'Receita atualizada com sucesso.'], Response::HTTP_OK);
    }

    public function deleteReceita(int $id): Response
    {
        Receita::where('id', $id)->where('idUser', auth()->user()->id)->delete();
        return new Response(['message' => 'Receita deletada com sucesso.'], Response::HTTP_OK);
    }
}