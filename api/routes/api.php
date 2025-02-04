<?php

use App\Http\Controllers\AuthenticationController;
use Illuminate\Support\Facades\Route;

Route::get('test', function () {
    return 'Hello, World!';
});

Route::post('login', [AuthenticationController::class, 'login']);

Route::post('logout', [AuthenticationController::class, 'logout']);