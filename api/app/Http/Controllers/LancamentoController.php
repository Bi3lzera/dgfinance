<?php

namespace App\Http\Controllers;

use App\Models\Lancamento;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\LancamentoService;
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

    public function index(Request $request): JsonResponse
    {
        $mes = $request->query('mes');
        $ano = $request->query('ano');
        return response()->json($this->service->getAllData($mes, $ano));
    }

    public function lancamentoAgendado(Request $request)
    {
        return response()->json($this->service->getLancamentosAgendado());
    }

    public function lancamentoEfetivado(Request $request): JsonResponse
    {
        $mes = $request->query('mes');
        $ano = $request->query('ano');
        return response()->json($this->service->getLancamentos($mes, $ano));
    }

    /*
    

    public function store(Request $request): Response
    {
        return new Response($this->service->createDespesa($request->all()), Response::HTTP_CREATED);
    }

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
