<?php
use Illuminate\Support\Facades\Route;
Route::get('test-abort', function () {
    abort(404, 'Test message');
});
