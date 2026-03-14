export interface Lancamento extends Operacao {
    id?:number;
    idUser: number;
    valor: number;
    totalParcelas: number;
    data: string;
    descricao: string;
    //breveDescricao: string;
    //descricaoDetalhada?: string;
    //categoriaId?: string;
    tipo: 'C' | 'D';
    agendado: 'S' | 'N';
}

export interface Operacao {
    idLancamento: number;
    operacao: 'C' | 'D';
    valorOperacao: number;
    parcelaOperacao: number;
    dataOperacao: string;
    idFormaPagamento?: number;
    idBanco?: number;
}