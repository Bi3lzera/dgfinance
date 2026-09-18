<?php
use App\Http\Controllers\AuthenticationController;

Route::post('logout', [AuthenticationController::class, 'logout']);