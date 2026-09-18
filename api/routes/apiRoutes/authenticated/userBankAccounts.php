<?php
use App\Http\Controllers\UserBankAccountController;

Route::group(['prefix' => 'userBankAccounts'], function () {
    Route::get('getAllUserAccounts', [UserBankAccountController::class, 'getAllUserAccounts']);
    Route::delete('deleteAccount', [UserBankAccountController::class, 'deleteAccount'])
        ->where('id', '[0-9]+');
    Route::post('createAccount', [UserBankAccountController::class, 'createAccount']);

    Route::put('updateAccount', [UserBankAccountController::class, 'updateUserAccount'])
        ->where('id', '[0-9]+');

    Route::get('findAccountById', [UserBankAccountController::class, 'findAccountById'])
        ->where('id', '[0-9]+');

    Route::get('getBankAccountTransactionList', [UserBankAccountController::class, 'getBankAccountTransactionList'])
        ->where('idAccount', '[0-9]+');
});