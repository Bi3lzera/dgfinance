<?php

namespace App\Http\Controllers;

use App\Models\Despesa;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\DespesaService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth\Factory;
use Whoops\Handler\JsonResponseHandler;

class DespesaController extends Controller
{
    public function __construct(
        public DespesaService $service
    ) {}

    public function index()
    {
        return response()->json($this->service->getAllDespesas());
    }

    public function show(Request $despesa)
    {
        return response()->json($this->service->getDespesa($despesa->id));
    }

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
}
