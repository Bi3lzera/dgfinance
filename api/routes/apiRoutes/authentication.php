<?php
use App\Http\Controllers\AuthenticationController;

Route::post('login', [AuthenticationController::class, 'login']);