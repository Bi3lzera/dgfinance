<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateLancamentoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        // Defina aqui sua lógica de autorização.
        // Por enquanto, vamos permitir que qualquer usuário autenticado prossiga.
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'descricao' => 'required|string|max:255',
            'valor' => 'required|numeric|min:0',
            'tipo' => ['required', 'string', Rule::in(['D', 'C'])], //Credito (C) ou Débito (D) // Ex: 'receita' ou 'despesa'
            'idUser' => 'required|numeric',
            'data' => 'required|date',
            'totalParcelas' => 'required|numeric', //Número total de parcelas, as parcelas pagas deverão serem consideradas as pagas na tabela operacao, se parcelado
            'agendado' => 'nullable|string', //Determina se está agendado ou não, S (sim) ou N (não)
            'dataAgendamento' => 'nullable|date', //Data do agendamento, se houver. Matenndo a data mesmo se o lançamento não estiver mais agendado.
        ];
    }
}
