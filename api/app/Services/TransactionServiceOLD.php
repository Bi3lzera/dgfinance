<?php

namespace App\Services;

use App\Models\Transaction;
use App\Models\Operacao;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class LancamentoService
{
    //Função para retornar todos os lançamentos cadastrados no mês/ano informado,
    //independente se tiveram ou não operações naquele período.
    public function getAllData(string $mes, int $ano): array
    {
        $mes = $this->monthId($mes);

        return Transaction::where('idUser', Auth::user()->id)
            ->whereMonth('data', $mes)
            ->whereYear('data', $ano)
            ->leftJoin('operacoes', 'lancamentos.id', '=', 'operacoes.idLancamento')
            ->leftJoin('bancos', 'idBanco', '=', 'bancos.id')
            ->leftJoin('forma_pagamentos', 'idFormaPagamento', '=', 'forma_pagamentos.id')
            ->select(
                'lancamentos.*',
                'bancos.nome as bancoNome',
                'forma_pagamentos.nome as formaPagamentoNome'
            )
            ->orderBy('data', 'asc')
            ->get()
            ->toArray();
    }

    //Função para retornar todos os lançamentos que tiveram operações no mês/ano informado,
    //ou seja, lançamentos que foram efetivados naquela data.
    public function getLancamentos(string $mes, int $ano): array
    {
        $mes = $this->monthId($mes);

        return Transaction::where('idUser', Auth::user()->id)
            ->whereMonth('dataLancamento', $mes)
            ->whereYear('dataLancamento', $ano)
            ->rightJoin('operacoes', 'lancamentos.id', '=', 'operacoes.idLancamento')
            ->leftJoin('bancos', 'operacoes.idBanco', '=', 'bancos.id')
            ->leftJoin('forma_pagamentos', 'operacoes.idFormaPagamento', '=', 'forma_pagamentos.id')
            ->select(
                'lancamentos.*',
                'bancos.nome as bancoNome',
                'forma_pagamentos.nome as formaPagamentoNome',
                'operacoes.valorOperacao',
                'operacoes.dataOperacao'
            )
            ->orderBy('dataLancamento', 'asc')
            ->get()
            ->toArray();
    }

    public function getLancamentoById(int $id)
    {
        return Transaction::where('idUser', Auth::user()->id)
            ->where('lancamentos.id', $id)
            ->select(
                'lancamentos.*'
            )
            ->orderBy('data', 'asc')
            ->get()
            ->toArray();
    }

    public function getOperacoesByLancamentoId(int $id)
    {
        return Operacao::where('operacoes.idLancamento', $id)
            ->leftJoin('lancamentos', 'operacoes.idLancamento', 'lancamentos.id')
            ->where('lancamentos.idUser', Auth::user()->id)
            ->leftJoin('bancos', 'operacoes.idBanco', '=', 'bancos.id')
            ->leftJoin('forma_pagamentos', 'operacoes.idFormaPagamento', '=', 'forma_pagamentos.id')
            ->select(
                'operacoes.*',
                'bancos.nome as bancoNome',
                'forma_pagamentos.nome as formaPagamentoNome',
            )
            ->orderBy('dataOperacao', 'asc')
            ->get()
            ->toArray();
    }

    //Função para retornar todos os lançamentos que estão agendados para o futuro.
    //TODO: Implementar filtro por data.
    public function getLancamentosAgendado(): array
    {
        return Transaction::where('idUser', Auth::user()->id)
            ->where('agendado', '=', 'S')
            ->rightJoin('operacoes', 'lancamentos.id', '=', 'operacoes.idLancamento')
            ->join('bancos', 'idBanco', '=', 'bancos.id')
            ->join('forma_pagamentos', 'idFormaPagamento', '=', 'forma_pagamentos.id')
            ->select(
                'lancamentos.*',
                'bancos.nome as bancoNome',
                'forma_pagamentos.nome as formaPagamentoNome',
                Transaction::raw("CONCAT('1', '/', lancamentos.totalParcelas) as fParcela")
            )
            ->orderBy('dataAgendamento', 'asc')
            ->get()
            ->toArray();
    }

    //Função para criar um novo lançamento
    public function createLancamento(array $data): Response
    {
        $transaction = Transaction::create($data);
        return new Response([
            'message' => 'Transaction criada com sucesso.',
            'id' => $transaction->id
        ], Response::HTTP_CREATED);
    }

    public function createOperacao(array $data): Response
    {
        Operacao::create($data);
        return new Response(['message' => 'Operação criada com sucesso.'], Response::HTTP_CREATED);
    }

    public function createLancamentoNOperacao(array $data): Response
    {
        $transaction = Transaction::create($data);
        $data['idLancamento'] = $transaction->id;
        $data['dataOperacao'] = $data['data'];
        Operacao::create($data);
        return new Response([
            'message' => 'Transação criada com sucesso.',
        ], Response::HTTP_CREATED);
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

    //CÓDIGO VELHO, COM POSSIBILIDADE DE REUTILIZAÇÃO.
    /*
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
    */
}
