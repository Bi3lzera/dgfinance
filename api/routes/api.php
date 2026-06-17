<?php

use App\Http\Controllers\AuthenticationController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\UserbanksController;
use App\Http\Controllers\MiscelaneousController;

Route::post('login', [AuthenticationController::class, 'login']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('logout', [AuthenticationController::class, 'logout']);

    Route::group(['prefix' => 'finance'], function () {

        //
        // Index de dados
        //
        Route::get('movementIndex', [TransactionController::class, 'movementIndex'])
            ->where('initialDate', '[0-9]{4}-[0-9]{2}-[0-9]{2}')
            ->where('finalDate', '[0-9]{4}-[0-9]{2}-[0-9]{2}');
        Route::get('installmentIndex', [TransactionController::class, 'installmentIndex'])
            ->where('movementId', '[0-9]+');
        Route::get('transactionIndex', [TransactionController::class, 'transactionIndex'])
            ->where('movementId', '[0-9]+');
        Route::get('transferIndex', [TransactionController::class, 'transferIndex']);
        Route::get('extratoIndex', [TransactionController::class, 'extratoIndex'])
            ->where('initialDate', '[0-9]{4}-[0-9]{2}-[0-9]{2}')
            ->where('finalDate', '[0-9]{4}-[0-9]{2}-[0-9]{2}');
        Route::get('transactionDetails', [TransactionController::class, 'transactionDetails'])
            ->where('id', '[0-9]+');

        //
        // Deleções de dados
        //
        Route::delete('deleteMovement', [TransactionController::class, 'deleteMovement'])
            ->where('id', '[0-9]+');
        Route::delete('deleteInstallment', [TransactionController::class, 'deleteInstallment'])
            ->where('id', '[0-9]+');
        Route::delete('deleteTransaction', [TransactionController::class, 'deleteTransaction'])
            ->where('id', '[0-9]+');
        Route::delete('deleteTransfer', [TransactionController::class, 'deleteTransfer'])
            ->where('id', '[0-9]+');

        //
        // Criações de dados
        //
        Route::post('createMovement', [TransactionController::class, 'createMovement']);
        Route::post('createInstallment', [TransactionController::class, 'createInstallment']);
        Route::post('createTransaction', [TransactionController::class, 'createTransaction']);
        Route::post('createTransfer', [TransactionController::class, 'createTransfer']);
        Route::post('createCompleteTransaction', [TransactionController::class, 'createCompleteTransaction']);
        Route::post('createMovementWithInstallments', [TransactionController::class, 'createMovementWithInstallments']);

        //
        // Atualizações de dados
        //
        Route::put('updateMovement', [TransactionController::class, 'updateMovement'])
            ->where('id', '[0-9]+');
        Route::put('updateInstallment', [TransactionController::class, 'updateInstallment'])
            ->where('id', '[0-9]+');
        Route::put('updateTransaction', [TransactionController::class, 'updateTransaction'])
            ->where('id', '[0-9]+');
        Route::put('updateTransfer', [TransactionController::class, 'updateTransfer'])
            ->where('id', '[0-9]+');
        Route::put('updateCompleteTransaction', [TransactionController::class, 'updateCompleteTransaction']);
        //
        // Busca por ID ou outros parâmetros
        //
        Route::get('findMovement', [TransactionController::class, 'findMovement'])
            ->where('id', '[0-9]+');
        Route::get('findInstallment', [TransactionController::class, 'findInstallment'])
            ->where('id', '[0-9]+');
        Route::get('findTransaction', [TransactionController::class, 'findTransaction'])
            ->where('id', '[0-9]+');
        Route::get('findTransfer', [TransactionController::class, 'findTransfer'])
            ->where('id', '[0-9]+');
    });

    Route::group(['prefix' => 'categories'], function () {
        Route::get('index', [CategoriaController::class, 'index']);
    });

    Route::group(['prefix' => 'userbanks'], function () {
        Route::get('index', [UserbanksController::class, 'index']);
    });

    Route::group(['prefix' => 'miscelaneous'], function () {
        Route::get('paymentMethods', [MiscelaneousController::class, 'getPaymentMethods']);
    });
})->middleware('auth:sanctum');

