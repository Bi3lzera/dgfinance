<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\TransactionService;
use App\Http\Requests\CreateTransactionRequest;
use App\Http\Requests\CreateOperacaoRequest;
use App\Http\Requests\CreateTransactionNOperacaoRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class TransactionController extends Controller
{
    public function __construct(
        public TransactionService $service
    ) {}

    public function movementIndex() : JsonResponse
    {
        return response()->json($this->service->getAllMovements(), Response::HTTP_OK);
    }
    public function installmentIndex(Request $request) : JsonResponse
    {
        return response()->json($this->service->getAllInstallments($request->query('movementId')), Response::HTTP_OK);
    }
    public function transactionIndex(Request $request) : JsonResponse
    {
        return response()->json($this->service->getAllTransactions($request->query('movementId')), Response::HTTP_OK);
    }
    public function transferIndex(Request $request) : JsonResponse
    {
        return response()->json($this->service->getAllTransfers(), Response::HTTP_OK);
    }
}
