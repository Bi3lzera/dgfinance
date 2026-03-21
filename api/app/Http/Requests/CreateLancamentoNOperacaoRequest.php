<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateLancamentoNOperacaoRequest extends FormRequest
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
            'operacao' => ['required', 'string', Rule::in(['C', 'D'])], //Credito (C) ou Débito (D).
            'valorOperacao' => 'required|numeric|min:0',
            'parcelaOperacao' => 'required|numeric', // número da parcela, se aplicável
            'idBanco' => 'nullable|numeric',
            'idFormaPagamento' => 'nullable|numeric' //Data do lançamento, sendo que é diferente das datas de operações, que são os pagamentos efetivos
        ];
    }

    public function messages(): array
    {
        return [
            'descricao.required' => 'A descrição é obrigatória.',
            'valor.required' => 'O valor é obrigatório.',
            'valor.numeric' => 'O valor deve ser um número.',
            'valor.min' => 'O valor deve ser maior ou igual a zero.',
            'tipo.required' => 'O tipo é obrigatório.',
            'tipo.in' => 'O tipo deve ser "D" ou "C".',
            'idUser.required' => 'O idUser é obrigatório.',
            'idUser.numeric' => 'O idUser deve ser um número.',
            'data.required' => 'A data é obrigatória.',
            'data.date' => 'A data deve ser uma data válida.',
            'totalParcelas.required' => 'O totalParcelas é obrigatório.',
            'totalParcelas.numeric' => 'O totalParcelas deve ser um número.',
            'operacao.required' => 'A operacao é obrigatória.',
            'operacao.in' => 'A operacao deve ser "D" ou "C".',
            'valorOperacao.required' => 'O valorOperacao é obrigatório.',
            'valorOperacao.numeric' => 'O valorOperacao deve ser um número.',
            'valorOperacao.min' => 'O valorOperacao deve ser maior ou igual a zero.',
            'parcelaOperacao.required' => 'A parcelaOperacao é obrigatória.',
            'parcelaOperacao.numeric' => 'A parcelaOperacao deve ser um número.',
            'idBanco.numeric' => 'O idBanco deve ser um número.',
            'idFormaPagamento.numeric' => 'O idFormaPagamento deve ser um número.'
        ];
    }
}
