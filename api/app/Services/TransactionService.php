<?php

namespace App\Services;

use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\Transaction;
use App\Models\Movement;
use App\Models\Installment;
use App\Models\Transfer;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class TransactionService
{
    public function getUser(): User
    {
        $user = Auth::user();
        if (!$user) {
            throw new \Exception('Usuário não autenticado.');
        }

        return $user;
    }
    //
    //
    //
    //
    /*
    TODO: 
        Alterar o type (receita ou despesa) para que pertença a tabela movement. 
        No type da transaction deverá ter somente se é débito ou credito.
    */
    //
    //
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
        $user = $this->getUser();
        Movement::where('id', $id)->where('idUser', $user->idUser)->update($data);
        return new Response([
            'message' => 'Movimentação atualizada com sucesso.',
        ], Response::HTTP_OK);
    }

    public function deleteMovement(int $id): Response
    {
        $user = $this->getUser();
        Movement::where('id', $id)->where('idUser', $user->idUser)->delete();
        return new Response([
            'message' => 'Movimentação deletada com sucesso.',
        ], Response::HTTP_OK);
    }

    public function findMovement(int $id): Response
    {
        $user = $this->getUser();
        return Movement::where('id', $id)->where('idUser', $user->idUser)->first();
    }

    public function getAllMovements(): array
    {
        $user = $this->getUser();
        return Movement::where('idUser', $user->idUser)->get()->toArray();
    }

    //Installment CRUD
    public function createInstallments(array $data): Response
    {
        $user = $this->getUser();
        Installment::create($data, ['idUser' => $user->idUser]);
        return new Response([
            'message' => 'Parcela criada com sucesso.',
        ], Response::HTTP_CREATED);
    }

    public function updateInstallment(int $id, array $data): Response
    {
        $user = $this->getUser();
        Installment::where('id', $id)->where('idUser', $user->idUser)->update($data);
        return new Response([
            'message' => 'Parcela atualizada com sucesso.',
        ], Response::HTTP_OK);
    }

    public function deleteInstallment(int $id): Response
    {
        $user = $this->getUser();
        Installment::where('id', $id)->where('idUser', $user->idUser)->delete();
        return new Response([
            'message' => 'Parcela deletada com sucesso.',
        ], Response::HTTP_OK);
    }

    public function findInstallment(int $id): Response
    {
        $user = $this->getUser();
        return Installment::where('id', $id)->where('idUser', $user->idUser)->first();
    }

    public function getAllInstallments(int $movementId): array
    {
        $user = $this->getUser();
        return Installment::where('installments.idMovement', $movementId)
            ->join('movements', 'installments.idMovement', '=', 'movements.idMovement')
            ->select('installments.*', 'movements.description as movement_description')
            ->where('movements.idUser', $user->idUser)
            ->get()
            ->toArray();
    }

    //Transaction CRUD
    public function createTransaction(array $data): Response
    {
        $user = $this->getUser();
        Transaction::create($data, ['idUser' => $user->idUser]);
        return new Response([
            'message' => 'Transação criada com sucesso.',
        ], Response::HTTP_CREATED);
    }

    public function updateTransaction(int $id, array $data): Response
    {
        $user = $this->getUser();
        Transaction::where('id', $id)->where('idUser', $user->idUser)->update($data);
        return new Response([
            'message' => 'Transação atualizada com sucesso.',
        ], Response::HTTP_OK);
    }

    public function deleteTransaction(int $id): Response
    {
        $user = $this->getUser();
        Transaction::where('id', $id)->where('idUser', $user->idUser)->delete();
        return new Response([
            'message' => 'Transação deletada com sucesso.',
        ], Response::HTTP_OK);
    }

    public function findTransaction(int $id): Response
    {
        $user = $this->getUser();
        return Transaction::where('id', $id)->where('idUser', $user->idUser)->first();
    }

    public function getAllTransactions(int $movementId): array
    {
        $user = $this->getUser();
        return Transaction::join('installments', 'transaction.idInstallment', '=', 'installments.idInstallment')
            ->where('installments.idMovement', $movementId)
            ->where('transaction.idUser', $user->idUser)
            ->select('transaction.*')
            ->get()
            ->toArray();
    }

    //Transfer CRUD
    public function createTransfer(array $data): Response
    {
        $user = $this->getUser();
        $transfer = Transfer::create($data, ['idUser' => $user->idUser]);
        return new Response([
            'message' => 'Transferência criada com sucesso.',
        ], Response::HTTP_CREATED);
    }

    public function updateTransfer(int $id, array $data): Response
    {
        $user = $this->getUser();
        Transfer::where('id', $id)->where('idUser', $user->idUser)->update($data);
        return new Response([
            'message' => 'Transferência atualizada com sucesso.',
        ], Response::HTTP_OK);
    }

    public function deleteTransfer(int $id): Response
    {
        $user = $this->getUser();
        Transfer::where('id', $id)->where('idUser', $user->idUser)->delete();
        return new Response([
            'message' => 'Transferência deletada com sucesso.',
        ], Response::HTTP_OK);
    }

    public function findTransfer(int $id): Response
    {
        $user = $this->getUser();
        return Transfer::where('id', $id)->where('idUser', $user->idUser)->first();
    }

    public function getAllTransfers(): array
    {
        $user = $this->getUser();
        return Transfer::where('idUser', $user->idUser)->get()->toArray();
    }
}