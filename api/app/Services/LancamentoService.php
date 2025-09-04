<?php

namespace App\Services;

use App\Models\Lancamento;
use Illuminate\Http\Response;

class LancamentoService
{
    public function getAllData(string $mes, int $ano): array
    {
        $mes = $this->monthId($mes);

        return Lancamento::where('idUser', auth()->user()->id)
            ->whereMonth('data', $mes)
            ->whereYear('data', $ano)
            ->join('bancos', 'idBanco', '=', 'bancos.id')
            ->join('forma_pagamentos', 'idFormaPagamento', '=', 'forma_pagamentos.id')
            ->select(
                'lancamentos.*',
                'bancos.nome as bancoNome',
                'forma_pagamentos.nome as formaPagamentoNome'
            )
            ->orderBy('data', 'asc')
            ->get()
            ->toArray();
    }

    public function getLancamentos(string $mes, int $ano): array
    {
        $mes = $this->monthId($mes);

        return Lancamento::where('idUser', auth()->user()->id)
            ->whereMonth('data', $mes)
            ->whereYear('data', $ano)
            ->join('bancos', 'idBanco', '=', 'bancos.id')
            ->join('forma_pagamentos', 'idFormaPagamento', '=', 'forma_pagamentos.id')
            ->join('operacoes', 'operacoes.idLancamento', '=', 'lancamentos.id')
            ->select(
                'lancamentos.*',
                'bancos.nome as bancoNome',
                'forma_pagamentos.nome as formaPagamentoNome',
                'operacoes.valorOperacao',
                'operacoes.dataOperacao'
            )
            ->orderBy('data', 'asc')
            ->get()
            ->toArray();
    }

    public function getDespesa(int $id): Lancamento
    {
        return Lancamento::where('id', $id)
            ->where('idUser', auth()->user()->id)
            ->first();
    }

    public function getLancamentosAgendado(): array
    {
        return Lancamento::where('idUser', auth()->user()->id)
            ->where('agendado', '=', 'S')
            ->join('bancos', 'idBanco', '=', 'bancos.id')
            ->join('forma_pagamentos', 'idFormaPagamento', '=', 'forma_pagamentos.id')
            ->select(
                'lancamentos.*',
                'bancos.nome as bancoNome',
                'forma_pagamentos.nome as formaPagamentoNome',
                Lancamento::raw("CONCAT('1', '/', lancamentos.totalParcelas) as fParcela")
            )
            ->orderBy('dataAgendamento', 'asc')
            ->get()
            ->toArray();
    }

    public function createLancamento(array $data): Response
    {
        Lancamento::create($data);
        return new Response(['message' => 'Lancamento criada com sucesso.'], Response::HTTP_CREATED);
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

    public function monthId(string $mes): int
    {
        $months = [
            'janeiro' => 1,
            'fevereiro' => 2,
            'março' => 3,
            'abril' => 4,
            'maio' => 5,
            'junho' => 6,
            'julho' => 7,
            'agosto' => 8,
            'setembro' => 9,
            'outubro' => 10,
            'novembro' => 11,
            'dezembro' => 12,
        ];

        return $months[$mes] ?? 1;
    }
}
