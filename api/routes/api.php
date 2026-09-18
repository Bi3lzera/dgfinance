<?php

use App\Http\Controllers\AuthenticationController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\UserAccountController;
use App\Http\Controllers\MiscelaneousController;
use App\Http\Controllers\UserCardController;

include __DIR__ . '/apiRoutes/authentication.php';

Route::group(['middleware' => 'auth:sanctum'], function () {
    include __DIR__ . '/apiRoutes/authenticated/loggedUser.php';
    
    include __DIR__ . '/apiRoutes/authenticated/userCards.php';
    include __DIR__ . '/apiRoutes/authenticated/userBankAccounts.php';
    include __DIR__ . '/apiRoutes/authenticated/miscelaneous.php';
    include __DIR__ . '/apiRoutes/authenticated/CRUDs.php';
})->middleware('auth:sanctum');

