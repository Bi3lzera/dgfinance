<?php

namespace App\Services;

use App\Models\Lancamento;
use Database\Seeders\LancamentoSeeder;
use Illuminate\Http\Response;

class LancamentoService
{
    public function getAllData(): array
    {
        return Lancamento::where('idUser', auth()->user()->id)
            ->join('bancos', 'idBanco', '=', 'bancos.id')
            ->join('forma_pagamentos', 'idFormaPagamento', '=', 'forma_pagamentos.id')
            ->select(
                'lancamentos.*',
                'bancos.nome as bancoNome',
                'forma_pagamentos.nome as formaPagamentoNome'
            )
            ->get()->toArray();
    }

    public function createLancamento(array $data): Response
    {
        Lancamento::create($data);
        return new Response(['message' => 'Lancamento criada com sucesso.'], Response::HTTP_CREATED);
    }

    public function getAllDespesas(): array
    {
        return Lancamento::where('idUser', auth()->user()->id)
            ->join('bancos', 'idBanco', '=', 'bancos.id')
            ->join('forma_pagamentos', 'idFormaPagamento', '=', 'forma_pagamentos.id')
            ->select(
                'despesas.*',
                'bancos.nome as bancoNome',
                'forma_pagamentos.nome as formaPagamentoNome',
                Lancamento::raw("CONCAT(despesas.parcela, '/', despesas.totalParcelas) as fParcela")
            )
            ->get()->toArray();
    }

    public function getDespesa(int $id): Lancamento
    {
        return Lancamento::where('id', $id)
            ->where('idUser', auth()->user()->id)
            ->first();
    }

    public function updateLancamento(array $data, int $id): Response
    {
        Lancamento::where('id', $id)->where('idUser', auth()->user()->id)->update($data);
        return new Response(['message' => 'Lancamento atualizada com sucesso.'], Response::HTTP_OK);
    }

    public function deleteLancamento(int $id): Response
    {
        Lancamento::where('id', $id)->where('idUser', auth()->user()->id)->delete();
        return new Response(['message' => 'Lancamento deletado com sucesso.'], Response::HTTP_OK);
    }

    public function getLancamentosAgendada(): array
    {
        return Lancamento::where('idUser', auth()->user()->id)
            ->where('agendado', '=', 'S')
            ->join('bancos', 'idBanco', '=', 'bancos.id')
            ->join('forma_pagamentos', 'idFormaPagamento', '=', 'forma_pagamentos.id')
            ->select(
                'despesas.*',
                'bancos.nome as bancoNome',
                'forma_pagamentos.nome as formaPagamentoNome',
                Lancamento::raw("CONCAT(despesas.parcela, '/', despesas.totalParcelas) as fParcela")
            )
            ->get()
            ->toArray();
    }
}
