<?php

namespace App\Services;

use App\Models\Despesa;
use Illuminate\Http\Response;

class DespesaService
{
    public function createDespesa(array $data): Response
    {
        Despesa::create($data);
        return new Response(['message' => 'Despesa criada com sucesso.'], Response::HTTP_CREATED);
    }

    public function getAllDespesas(): array
    {
        return Despesa::where('idUser', auth()->user()->id)
            ->join('bancos', 'idBanco', '=', 'bancos.id')
            ->join('forma_pagamentos', 'idFormaPagamento', '=', 'forma_pagamentos.id')
            ->select(
                'despesas.*',
                'bancos.nome as bancoNome',
                'forma_pagamentos.nome as formaPagamentoNome',
                Despesa::raw("CONCAT(despesas.parcela, '/', despesas.totalParcelas) as fParcela")
            )
            ->get()->toArray();
    }

    public function getDespesa(int $id): Despesa
    {
        return Despesa::where('id', $id)
            ->where('idUser', auth()->user()->id)
            ->first();
    }

    public function updateDespesa(array $data, int $id): Response
    {
        Despesa::where('id', $id)->where('idUser', auth()->user()->id)->update($data);
        return new Response(['message' => 'Despesa atualizada com sucesso.'], Response::HTTP_OK);
    }

    public function deleteDespesa(int $id): Response
    {
        Despesa::where('id', $id)->where('idUser', auth()->user()->id)->delete();
        return new Response(['message' => 'Despesa deletada com sucesso.'], Response::HTTP_OK);
    }

    public function getDespesaAgendada(): array
    {
        return Despesa::where('idUser', auth()->user()->id)
            ->where('agendado', '=', 'S')
            ->join('bancos', 'idBanco', '=', 'bancos.id')
            ->join('forma_pagamentos', 'idFormaPagamento', '=', 'forma_pagamentos.id')
            ->select(
                'despesas.*',
                'bancos.nome as bancoNome',
                'forma_pagamentos.nome as formaPagamentoNome',
                Despesa::raw("CONCAT(despesas.parcela, '/', despesas.totalParcelas) as fParcela")
            )
            ->get()
            ->toArray();
    }
}
