export interface ExtratoModel {
    id: string;
    data: string;
    title: string;
    tag: string;
    institution: string;
    institutionDot: string;
    amount: string;
    paymentType: string;
    transactionType: string;
    status: string;
}

export interface ExtratoDetailsModel {
    idTransaction?: number;
    idInstallment?: number;
    idMovement?: number;
    title: string;
    description: string;
    initialValue: number;
    type: string;
    totalPaymentCount: number;
    idCategory: number;
    date: string,
    plannedDate: string,
    expectedValue: number,
    installmentNumber: number,
    status: string,
    paymentRecurrencyMethod: string,
    transactionDescription: string,
    value: number,
    idBankAccount: number,
    idPaymentMethod: number,
    idPaymentCard: number
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