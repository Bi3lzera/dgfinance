<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateOperacaoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'idLancamento' => 'required|numeric',
            'operacao' => ['required', 'string', Rule::in(['C', 'D'])], //Credito (C) ou Débito (D).
            'valorOperacao' => 'required|numeric|min:0',
            'parcelaOperacao' => 'required|numeric', // número da parcela, se aplicável
            'dataOperacao' => 'required|date', // data da operação
            'idBanco' => 'nullable|numeric',
            'idFormaPagamento' => 'nullable|numeric' //Data do lançamento, sendo que é diferente das datas de operações, que são os pagamentos efetivos
        ];
    }
}
