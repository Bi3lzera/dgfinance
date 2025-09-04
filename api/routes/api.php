<?php

use App\Http\Controllers\AuthenticationController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LancamentoController;

Route::post('login', [AuthenticationController::class, 'login']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('logout', [AuthenticationController::class, 'logout']);

    Route::group(['prefix' => 'lancamentos'], function () {
        Route::get('index', [LancamentoController::class, 'index']);

        //Route::post('store', [DespesaController::class, 'store']);        
        //Route::get('show', [DespesaController::class, 'show']);
        //Route::put('update', [DespesaController::class, 'update'])->where('id', '[0-9]+');
        //Route::delete('delete', [DespesaController::class, 'destroy'])->where('id', '[0-9]+');
        //Route::get('total', [DespesaController::class, 'total']);
        //Route::get('despesaAgendada', [DespesaController::class, 'despesaAgendada']);
    });
})->middleware('auth:sanctum', 'unauthenticated');
