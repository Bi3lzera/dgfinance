<?php

namespace App\Http\Controllers;

use App\Models\UserCard;
use App\Services\UserCardService;
use Illuminate\Http\Request;

class UserCardController extends Controller
{
    public function __construct(UserCardService $userCardService)
    {
        $this->userCardService = $userCardService;
    }

    public function getUserCardList(){
        return response()->json($this->userCardService->getUserCardList());
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(UserCard $userCard)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UserCard $userCard)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserCard $userCard)
    {
        //
    }
}
