<?php

use App\Http\Controllers\AuthenticationController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LancamentoController;

Route::post('login', [AuthenticationController::class, 'login']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('logout', [AuthenticationController::class, 'logout']);

    Route::group(['prefix' => 'lancamentos'], function () {
        Route::get('index', [LancamentoController::class, 'index'])
            ->where('mes', '[a-zA-Z]+')
            ->where('ano', '[0-9]+');
        Route::get('agendado', [LancamentoController::class, 'lancamentoAgendado'])
            ->where('mes', '[a-zA-Z]+')
            ->where('ano', '[0-9]+');
        Route::get('efetivado', [LancamentoController::class, 'lancamentoEfetivado'])
            ->where('ano', '[0-9]+');
        Route::post('createLancamento', [LancamentoController::class, 'createLancamento']); 
        Route::post('createOperacao', [LancamentoController::class, 'createOperacao']);    

        //   
        //
        //Route::put('update', [DespesaController::class, 'update'])->where('id', '[0-9]+');
        //Route::delete('delete', [DespesaController::class, 'destroy'])->where('id', '[0-9]+');
        //Route::get('total', [DespesaController::class, 'total']);
        //
    });
})->middleware('auth:sanctum');
