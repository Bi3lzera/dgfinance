<?php
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\MiscelaneousController;

Route::group(['prefix' => 'categories'], function () {
    Route::get('index', [CategoriaController::class, 'index']);
});

Route::group(['prefix' => 'miscelaneous'], function () {
    Route::get('paymentMethods', [MiscelaneousController::class, 'getPaymentMethods']);
    Route::get('bankList', [MiscelaneousController::class, 'getBanks']);
});