<?php

namespace App\Services;


use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Transaction;
use App\Models\Movement;
use App\Models\Installment;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

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

    public function updateCompleteTransaction(array $data): array
    {
        $user = $this->getUser();
        $data['idUser'] = $user->idUser;
        return DB::transaction(function () use ($data, $user) {
            // 1. Busca e atualiza a Movimentação (garantindo que pertence ao usuário)
            $movement = Movement::where('idMovement', $data['idMovement'])
                ->where('idUser', $user->idUser)
                ->firstOrFail();
            $movement->update($data); // Filtra pelo $fillable de Movement
            // 2. Busca e atualiza a Parcela (vinculada à movimentação do usuário)
            $installment = Installment::where('idInstallment', $data['idInstallment'])
                ->where('idMovement', $movement->idMovement)
                ->firstOrFail();
            $installment->update($data); // Filtra pelo $fillable de Installment
            // 3. Busca e atualiza a Transação (garantindo que pertence ao usuário)
            $transaction = Transaction::where('idTransaction', $data['idTransaction'])
                ->where('idUser', $user->idUser)
                ->firstOrFail();
            $transaction->update($data); // Filtra pelo $fillable de Transaction
            return [
                'message' => 'Transação completa atualizada com sucesso.',
            ];
        });
    }

    public function createCompleteTransaction(array $data): array
    {
        $user = $this->getUser();
        $data['idUser'] = $user->idUser;

        return DB::transaction(function () use ($data) {
            $movement = Movement::create($data);

            $data['idMovement'] = $movement->idMovement;
            $installment = Installment::create($data);

            $data['idInstallment'] = $installment->idInstallment;
            Transaction::create($data);

            return [
                'message' => 'Transação completa criada com sucesso.',
            ];
        });
    }

    public function getExtrato(string $initialDate, string $finalDate): array
    {
        $user = $this->getUser();

        return Movement::query()
            ->select([
                'movements.idMovement',
                'installments.idInstallment',
                'transaction.idTransaction',
                'transaction.date as transactionDate',
                'movements.title as movementTitle',
                'categories.descriptionTranslated as categoryTitle',
                'banks.name as bankName',
                'users_bank_accounts.accountAlias as bankAccountAlias',
                'payment_methods.description as paymentMethodName',
                'users_cards.cardAlias as cardAlias',
                'transaction.value as transactionValue',
                'transaction.type as transactionType',
                'installments.status as installmentStatus',
            ])
            ->join('installments', 'movements.idMovement', '=', 'installments.idMovement')
            ->join('transaction', 'installments.idInstallment', '=', 'transaction.idInstallment')
            ->leftJoin('categories', 'movements.idCategory', '=', 'categories.id')
            ->leftJoin('users_bank_accounts', 'transaction.idBankAccount', '=', 'users_bank_accounts.idAccount')
            ->leftJoin('banks', 'users_bank_accounts.idBank', '=', 'banks.idBank')
            ->leftJoin('payment_methods', 'transaction.idPaymentMethod', '=', 'payment_methods.idPayMethod')
            ->leftJoin('users_cards', 'transaction.idPaymentCard', '=', 'users_cards.idCard')
            ->where('movements.idUser', $user->idUser)
            ->whereBetween('transaction.date', [$initialDate, $finalDate])
            ->orderBy('transaction.date', 'desc')
            ->get()
            ->toArray();
    }

    public function getTransactionDetails(int $id)
    {
        $user = $this->getUser();

        $transaction = Transaction::with(['installment.movement'])
            ->where('idTransaction', $id)
            ->where('idUser', $user->idUser)
            ->first();

        if (!$transaction) {
            abort(404, 'Transação não encontrada ou não pertence ao usuário logado.');
        }

        $installment = $transaction->installment;
        $movement = $installment ? $installment->movement : null;

        return [
            'idTransaction' => $transaction->idTransaction,
            'idInstallment' => $installment ? $installment->idInstallment : null,
            'idMovement' => $movement ? $movement->idMovement : null,
            'title' => $movement ? $movement->title : '',
            'description' => $movement ? $movement->description : '',
            'totalValue' => $movement ? $movement->totalValue : $transaction->value,
            'type' => $movement ? $movement->type : $transaction->type,
            'totalInstallments' => $movement ? $movement->totalInstallments : 1,
            'idCategory' => $movement ? $movement->idCategory : 1,
            'date' => $transaction->date,
            'plannedDate' => $installment ? $installment->plannedDate : $transaction->date,
            'expectedValue' => $installment ? $installment->expectedValue : $transaction->value,
            'installmentNumber' => $installment ? $installment->installmentNumber : 1,
            'status' => $installment ? $installment->status : 'Efetivado',
            'transactionDescription' => $transaction->transactionDescription,
            'value' => $transaction->value,
            'idBankAccount' => $transaction->idBankAccount,
            'idPaymentMethod' => $transaction->idPaymentMethod,
            'idPaymentCard' => $transaction->idPaymentCard,
            'paymentRecurrencyMethod' => $movement ? $movement->paymentRecurrencyMethod : null,
            'transferUUID' => $movement ? $movement->transferUUID : null,
            'idBill' => $transaction->idBill,
        ];
    }

    //Movement CRUD
    public function createMovement(array $data): array
    {
        $movement = Movement::create($data);
        $movement->id = $movement->idMovement;
        return [
            'message' => 'Movimentação criada com sucesso.',
            'createdMovementId' => $movement,
        ];
    }

    public function updateMovement(int $id, array $data): array
    {
        $user = $this->getUser();
        Movement::where('idMovement', $id)->where('idUser', $user->idUser)->update($data);
        return [
            'message' => 'Movimentação atualizada com sucesso.',
        ];
    }

    public function deleteMovement(int $id): array
    {
        $user = $this->getUser();
        $movement = Movement::where('idMovement', $id)->where('idUser', $user->idUser)->first();
        
        if (!$movement) {
            abort(404, 'Movimentação não encontrada ou não pertence ao usuário logado.');
        }

        $movement->delete();
        return [
            'message' => 'Movimentação deletada com sucesso.',
        ];
    }

    public function findMovement(int $id): array
    {
        $user = $this->getUser();
        return Movement::where('idMovement', $id)->where('idUser', $user->idUser)->get()->toArray();
    }

    public function getAllMovements(string $initialDate, string $finalDate): array
    {
        $user = $this->getUser();
        return Movement::where('idUser', $user->idUser)
            ->whereBetween('created_at', [$initialDate, $finalDate])
            ->get()
            ->toArray();
    }

    //Installment CRUD
    public function createInstallment(array $data): array
    {
        $user = $this->getUser();
        $data['idUser'] = $user->idUser;
        Installment::create($data);
        return [
            'message' => 'Parcela criada com sucesso.',
        ];
    }

    public function updateInstallment(int $id, array $data): array
    {
        $user = $this->getUser();
        if (
            Installment::where('idInstallment', $id)
                ->join('movements', 'installments.idMovement', '=', 'movements.idMovement')
                ->where('movements.idUser', $user->idUser)
                ->count() == 0
        ) {
            abort(404, 'Parcela não encontrada ou não pertence ao usuário logado.');
        }

        Installment::where('idInstallment', $id)->update($data);
        return [
            'message' => 'Parcela atualizada com sucesso.',
        ];
    }

    public function deleteInstallment(int $id): array
    {
        $user = $this->getUser();
        $installment = Installment::where('installments.idInstallment', $id)
            ->join('movements', 'installments.idMovement', '=', 'movements.idMovement')
            ->where('movements.idUser', $user->idUser)
            ->select('installments.*')
            ->first();

        if (!$installment) {
            abort(404, 'Parcela não encontrada ou não pertence ao usuário logado.');
        }

        $installment->delete();
        return [
            'message' => 'Parcela deletada com sucesso.',
        ];
    }

    public function findInstallment(int $id): array
    {
        $user = $this->getUser();
        if (
            Installment::where('idInstallment', $id)
                ->join('movements', 'installments.idMovement', '=', 'movements.idMovement')
                ->where('movements.idUser', $user->idUser)
                ->count() == 0
        ) {
            return [
                'message' => 'Parcela não encontrada ou não pertence ao usuário logado.',
            ];
        }

        return Installment::where('idInstallment', $id)->get()->toArray();
    }

    public function getAllInstallments(int $movementId): array
    {
        $user = $this->getUser();
        return Installment::where('installments.idMovement', $movementId)
            ->join('movements', 'installments.idMovement', '=', 'movements.idMovement')
            ->leftjoin('transaction', 'transaction.idInstallment', '=', 'installments.idInstallment')
            ->leftjoin('payment_methods', 'transaction.idPaymentMethod', '=', 'payment_methods.idPayMethod')
            ->select(
                'installments.*',
                'movements.description as movement_description',
                'movements.totalInstallments',
                'transaction.idTransaction',
                'transaction.value as transactionValuePaid',
                'payment_methods.title as paymentMethod',
            )
            ->where('movements.idUser', $user->idUser)
            ->get()
            ->toArray();
    }

    //Transaction CRUD
    public function createTransaction(array $data): array
    {
        $user = $this->getUser();
        Transaction::create($data);
        return [
            'message' => 'Transação criada com sucesso.',
        ];
    }

    public function updateTransaction(int $id, array $data): array
    {
        $user = $this->getUser();
        Transaction::where('idTransaction', $id)->where('idUser', $user->idUser)->update($data);
        return [
            'message' => 'Transação atualizada com sucesso.',
        ];
    }

    public function deleteTransaction(int $id): array
    {
        $user = $this->getUser();
        $transaction = Transaction::where('idTransaction', $id)->where('idUser', $user->idUser)->first();
        if (!$transaction) {
            abort(Response::HTTP_NOT_FOUND, 'Transação não encontrada ou não pertence ao usuário logado.');
        }
        
        $transaction->delete();
        return [
            'message' => 'Transação deletada com sucesso.',
        ];
    }

    public function findTransaction(int $id): array
    {
        $user = $this->getUser();
        return Transaction::where('idTransaction', $id)->where('idUser', $user->idUser)->get()->toArray();
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

}