<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\LancamentoService;
use App\Http\Requests\CreateTransactionRequest;
use App\Http\Requests\CreateOperacaoRequest;
use App\Http\Requests\CreateTransactionNOperacaoRequest;
use Illuminate\Database\Eloquent\Casts\Json;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth\Factory;
use Whoops\Handler\JsonResponseHandler;

class LancamentoController extends Controller
{
    public function __construct(
        public LancamentoService $service
    ) {}

    //
    //Get data section
    //Search, find and bring data functions of many parts.
    //

    public function index(Request $request): JsonResponse
    {
        return response()->json(
            $this->service->getAllData($request->query('mes'), $request->query('ano'))
        );
    }

    public function lancamentoAgendado(Request $request)
    {
        return response()->json(
            $this->service->getLancamentosAgendado()
        );
    }

    public function lancamentoEfetivado(Request $request): JsonResponse
    {
        return response()->json(
            $this->service->getLancamentos($request->query('mes'), $request->query('ano'))
        );
    }

    public function lancamentoById(Request $request): JsonResponse
    {
        return response()->json(
            $this->service->getLancamentoById($request->query('id'))
        );
    }

    public function operacoesByLancamentoId(Request $request): JsonResponse
    {
        return response()->json(
            $this->service->getOperacoesByLancamentoId($request->query('lancamentoId'))
        );
    }

    //
    //Create section
    //Store the create functions of many parts.
    //

    public function createLancamento(CreateTransactionRequest $request): Response
    {
        return new Response($this->service->createLancamento($request->all()), Response::HTTP_CREATED);
    }

    public function createOperacao(CreateOperacaoRequest $request): Response
    {
        return new Response($this->service->createOperacao($request->all()), Response::HTTP_CREATED);
    }

    public function createLancamentoNOperacao(CreateLancamentoNOperacaoRequest $request): Response
    {
        return new Response($this->service->createLancamentoNOperacao($request->all()), Response::HTTP_CREATED);
    }

    /*
    public function update(Request $request): Response
    {
        return new Response($this->service->updateDespesa($request->all(), $request->query('id')), Response::HTTP_OK);
    }

    public function destroy(Request $request): Response
    {
        return new Response($this->service->deleteDespesa($request->query('id')), Response::HTTP_OK);
    }
    */
}
