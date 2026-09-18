<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Services\UserBankAccountService;

class UserBankAccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function getAllUserAccounts(): JsonResponse
    {
        $userBankAccountService = new UserBankAccountService();
        $userAccount = $userBankAccountService->getAllUserAccounts();
        return response()->json($userAccount);
    }

    public function getBankAccountTransactionList(Request $request): JsonResponse
    {
        $userBankAccountService = new UserBankAccountService();
        $userAccount = $userBankAccountService->getBankAccountTransactionList($request->idAccount);
        return response()->json($userAccount);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function createAccount(Request $request): JsonResponse
    {
        $userBankAccountService = new UserBankAccountService();
        $userAccount = $userBankAccountService->createAccount($request->all());
        return response()->json($userAccount, 201);
    }

    /**
     * Display the specified resource.
     */
    public function findAccountById(Request $request): JsonResponse
    {
        $userBankAccountService = new UserBankAccountService();
        $userAccount = $userBankAccountService->getAccountById($request->id);
        return response()->json($userAccount);
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateUserAccount(Request $request): JsonResponse
    {
        $userBankAccountService = new UserBankAccountService();
        $userAccount = $userBankAccountService->updateAccount($request);
        return response()->json($userAccount);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function deleteAccount(Request $request): JsonResponse
    {
        $userBankAccountService = new UserBankAccountService();
        $userAccount = $userBankAccountService->deleteAccount($request->id);
        return response()->json($userAccount);
    }
}
