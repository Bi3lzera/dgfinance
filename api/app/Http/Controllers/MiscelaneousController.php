<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\UserService;
use App\Services\MiscelaneousService;
use Illuminate\Http\JsonResponse;

class MiscelaneousController extends Controller
{
    public function __construct(UserService $userService, MiscelaneousService $miscelaneousService)
    {
        $this->userService = $userService;
        $this->miscelaneousService = $miscelaneousService;
    }

    public function getPaymentMethods(): JsonResponse
    {
        return response()->json($this->userService->getPaymentMethods());
    }

    public function getBanks(): JsonResponse
    {
        return response()->json($this->miscelaneousService->getBanks());
    }
}
