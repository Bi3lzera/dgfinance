<?php
use App\Http\Controllers\UserCardController;

Route::group(['prefix' => 'userCards'], function (){
    Route::get('getUserCardList', [UserCardController::class, 'getUserCardList']);
});