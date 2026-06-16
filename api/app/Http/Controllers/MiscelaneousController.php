<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;

class MiscelaneousController extends Controller
{
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function getPaymentMethods(): JsonResponse
    {
        return response()->json($this->userService->getPaymentMethods());
    }
}
