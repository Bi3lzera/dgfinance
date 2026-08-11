<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Services\UserAccountService;

class UserAccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function getAllUserAccounts(): JsonResponse
    {
        $userAccountService = new UserAccountService();
        $userAccount = $userAccountService->getAllUserAccounts();
        return response()->json($userAccount);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function createAccount(Request $request): JsonResponse
    {
        $userAccountService = new UserAccountService();
        $userAccount = $userAccountService->createAccount($request->all());
        return response()->json($userAccount, 201);
    }

    /**
     * Display the specified resource.
     */
    public function findAccountById(Request $request): JsonResponse
    {
        $userAccountService = new UserAccountService();
        $userAccount = $userAccountService->getAccountById($request->id);
        return response()->json($userAccount);
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateUserAccount(Request $request): JsonResponse
    {
        $userAccountService = new UserAccountService();
        $userAccount = $userAccountService->updateAccount($request);
        return response()->json($userAccount);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function deleteAccount(Request $request): JsonResponse
    {
        $userAccountService = new UserAccountService();
        $userAccount = $userAccountService->deleteAccount($request->id);
        return response()->json($userAccount);
    }
}
