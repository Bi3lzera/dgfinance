<?php

namespace App\Services;

use App\Models\Userbank;
use Illuminate\Support\Facades\Auth;

class UserbanksService
{
    //Função para retornar todos os bancos do usuário autenticado.
    public function getAllUserbanks(): array
    {
        return Userbank::where('idUser', Auth::user()->id)
            ->rightjoin('bancos', 'userbanks.idBanco', '=', 'bancos.id')
            ->select(
                'userbanks.idUser',
                'userbanks.idBanco',
                'userbanks.accountNumber',
                'bancos.nome as bancoNome'
            )
            ->orderBy('bancoNome', 'asc')
            ->get()
            ->toArray();
    }
}
