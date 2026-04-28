export interface ExtratoModel {
    id: string;
    data: string;
    title: string;
    tag: string;
    institution: string;
    institutionDot: string;
    amount: string;
    paymentType: string;
    isExpense: boolean;
    status: string;
}

/*
    "id": 713,
    "idUser": 1,
    "descricao": "Velit unde aut vitae quas saepe.",
    "valor": 6496.23,
    "data": "2025-09-02",
    "totalParcelas": 6,
    "agendado": "N",
    "dataAgendamento": "2026-10-28",
    "tipo": "C",
    "created_at": "2026-03-05T02:43:28.000000Z",
    "updated_at": "2026-03-05T02:43:28.000000Z",
    "bancoNome": "Itau",
    "formaPagamentoNome": "Dinheiro",
    "valorOperacao": 6496.23,
    "dataOperacao": "2025-04-12"
*/