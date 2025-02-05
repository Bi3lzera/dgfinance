<?php

namespace App\Http\Controllers;

use App\Models\Receita;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\ReceitaService;
use Illuminate\Http\Response;

class ReceitaController extends Controller
{
    public function __construct(
        public ReceitaService $service)
    {
        
    }

    public function index()
    {
        return response()->json($this->service->getAllReceitas());
    }

    public function show(Request $receita)
    {
        return response()->json($this->service->getReceita($receita->id));
    }

    public function store(Request $request): Response
    {
        return new Response($this->service->createReceita($request->all()), Response::HTTP_CREATED);
    }

    public function update(Request $request): Response
    {
        return new Response($this->service->updateReceita($request->all(), $request->query('id')), Response::HTTP_OK);
    }

    public function destroy(Request $request): Response
    {
        return new Response($this->service->deleteReceita($request->query('id')), Response::HTTP_OK);
    }
}
