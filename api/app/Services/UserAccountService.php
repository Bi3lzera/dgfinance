<?php

namespace App\Services;

use App\Models\BankAccount;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserAccountService
{
    public function getUser(): User
    {
        $user = Auth::user();
        if (!$user) {
            throw new \Exception('Usuário não autenticado.');
        }

        return $user;
    }

    //Função para retornar todos os bancos do usuário autenticado.
    public function getAllUserAccounts(): array
    {
        return BankAccount::where('users_bank_accounts.idUser', Auth::id())
            ->join('banks', 'users_bank_accounts.idBank', '=', 'banks.idBank')
            ->select(
                'users_bank_accounts.idAccount',
                'users_bank_accounts.idUser',
                'users_bank_accounts.idBank',
                'users_bank_accounts.accountNumber',
                'users_bank_accounts.accountAlias',
                'banks.name as bankName'
            )
            ->orderBy('bankName', 'asc')
            ->get()
            ->toArray();
    }

    public function createAccount(array $data): array
    {
        $user = $this->getUser();

        $userAccount = BankAccount::create(array_merge($data, [
            'idUser' => $user->idUser,
        ]));

        return [
            'message' => 'Conta bancária criada com sucesso.',
            'createdUserAccountId' => $userAccount->idAccount,
        ];
    }

    public function updateAccount($request): array
    {
        $user = $this->getUser();
        $bankAccount = BankAccount::where('idAccount', $request->idAccount)->where('idUser', $user->idUser)->get()->toArray();

        if (count($bankAccount) == 0) {
            abort(404, 'Conta bancária não encontrada ou não pertence ao usuário logado.');
        }

        BankAccount::where('idAccount', $request->idAccount)->where('idUser', $user->idUser)->update($request->all());
        return [
            'message' => 'Conta bancária atualizada com sucesso.',
        ];
    }

    public function deleteAccount($id): array
    {
        $user = $this->getUser();
        if (BankAccount::where('idAccount', $id)->where('idUser', $user->idUser)->count() == 0) {
            abort(404, 'Conta bancária não encontrada ou não pertence ao usuário logado.');
        }

        BankAccount::where('idAccount', $id)->where('idUser', $user->idUser)->delete();
        return [
            'message' => 'Conta bancária deletada com sucesso.',
        ];
    }

    public function getAccountById($id): array
    {
        $account = BankAccount::where('users_bank_accounts.idUser', Auth::id())
            ->where('users_bank_accounts.idAccount', $id)
            ->join('banks', 'users_bank_accounts.idBank', '=', 'banks.idBank')
            ->select(
                'users_bank_accounts.idAccount',
                'users_bank_accounts.idUser',
                'users_bank_accounts.idBank',
                'users_bank_accounts.accountNumber',
                'users_bank_accounts.accountAlias',
                'banks.name as bankName'
            )
            ->orderBy('bankName', 'asc')
            ->get()
            ->toArray();

        if(count($account) == 0) {
            abort(404, 'Conta bancária não encontrada ou não pertence ao usuário logado.');
        }

        return $account;
    }
}
