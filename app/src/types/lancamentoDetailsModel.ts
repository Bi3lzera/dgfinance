export interface lancamentoDetailsModel {
    id: number;
    descricao: string;
    valor: number;
    data: string;
    totalParcelas?: number;
    agendado?: string;
    dataAgendamento?: string;
    tipo?: string;
    operacoes?: operacaoDetailsModel[];
}

export interface operacaoDetailsModel {
    formaPagamento?: string;
    idOperacao?: number;
    idBanco?: number;
    idFormaPagamento?: number;
    bancoNome?: string;
    formaPagamentoNome?: string;
}