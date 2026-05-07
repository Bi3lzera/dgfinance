<?php

namespace App\Services;

use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\Transaction;
use App\Models\Movement;
use App\Models\Installment;
use App\Models\Transfer;

class TransactionService
{
    //Movement CRUD
    public function createMovement(array $data): Response
    {
        Movement::create($data);
        return new Response([
            'message' => 'Movimentação criada com sucesso.',
        ], Response::HTTP_CREATED);
    }

    public function updateMovement(int $id, array $data): Response
    {
        Movement::where('id', $id)->update($data);
        return new Response([
            'message' => 'Movimentação atualizada com sucesso.',
        ], Response::HTTP_OK);
    }

    public function deleteMovement(int $id): Response
    {
        Movement::where('id', $id)->delete();
        return new Response([
            'message' => 'Movimentação deletada com sucesso.',
        ], Response::HTTP_OK);
    }

    public function findMovement(int $id): Response
    {
        return Movement::where('id', $id)->first();
    }

    //Installment CRUD
    public function createInstallments(array $data): Response
    {
        Installment::create($data);
        return new Response([
            'message' => 'Parcela criada com sucesso.',
        ], Response::HTTP_CREATED);
    }

    public function updateInstallment(int $id, array $data): Response
    {
        Installment::where('id', $id)->update($data);
        return new Response([
            'message' => 'Parcela atualizada com sucesso.',
        ], Response::HTTP_OK);
    }

    public function deleteInstallment(int $id): Response
    {
        Installment::where('id', $id)->delete();
        return new Response([
            'message' => 'Parcela deletada com sucesso.',
        ], Response::HTTP_OK);
    }

    public function findInstallment(int $id): Response
    {
        return Installment::where('id', $id)->first();
    }

    //Transaction CRUD
    public function createTransaction(array $data): Response
    {
        $transaction = Transaction::create($data);
        return new Response([
            'message' => 'Transação criada com sucesso.',
        ], Response::HTTP_CREATED);
    }

    public function updateTransaction(int $id, array $data): Response
    {
        Transaction::where('id', $id)->update($data);
        return new Response([
            'message' => 'Transação atualizada com sucesso.',
        ], Response::HTTP_OK);
    }

    public function deleteTransaction(int $id): Response
    {
        Transaction::where('id', $id)->delete();
        return new Response([
            'message' => 'Transação deletada com sucesso.',
        ], Response::HTTP_OK);
    }

    public function findTransaction(int $id): Response
    {
        return Transaction::where('id', $id)->first();
    }

    //Transfer CRUD
    public function createTransfer(array $data): Response
    {
        $transfer = Transfer::create($data);
        return new Response([
            'message' => 'Transferência criada com sucesso.',
        ], Response::HTTP_CREATED);
    }

    public function updateTransfer(int $id, array $data): Response
    {
        Transfer::where('id', $id)->update($data);
        return new Response([
            'message' => 'Transferência atualizada com sucesso.',
        ], Response::HTTP_OK);
    }

    public function deleteTransfer(int $id): Response
    {
        Transfer::where('id', $id)->delete();
        return new Response([
            'message' => 'Transferência deletada com sucesso.',
        ], Response::HTTP_OK);
    }

    public function findTransfer(int $id): Response
    {
        return Transfer::where('id', $id)->first();
    }
}