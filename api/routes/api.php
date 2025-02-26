<?php

use App\Http\Controllers\AuthenticationController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DespesaController;
use App\Http\Controllers\ReceitaController;

Route::post('login', [AuthenticationController::class, 'login']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('logout', [AuthenticationController::class, 'logout']);

    Route::group(['prefix' => 'despesa'], function () {
        Route::post('store', [DespesaController::class, 'store']);
        Route::get('index', [DespesaController::class, 'index']);
        Route::get('show', [DespesaController::class, 'show']);
        Route::put('update', [DespesaController::class, 'update'])->where('id', '[0-9]+');
        Route::delete('delete', [DespesaController::class, 'destroy'])->where('id', '[0-9]+');
        Route::get('total', [DespesaController::class, 'total']);
        Route::get('despesaAgendada', [DespesaController::class, 'despesaAgendada']);
    });

    Route::group(['prefix' => 'receita'], function () {
        Route::post('store', [ReceitaController::class, 'store']);
        Route::get('index', [ReceitaController::class, 'index']);
        Route::get('show', [ReceitaController::class, 'show']);
        Route::put('update', [ReceitaController::class, 'update'])->where('id', '[0-9]+');
        Route::delete('delete', [ReceitaController::class, 'destroy'])->where('id', '[0-9]+');
    });
})->middleware('auth:sanctum', 'unauthenticated');
