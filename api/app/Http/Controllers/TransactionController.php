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

    
}
