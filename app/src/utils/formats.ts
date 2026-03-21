

export function formatCurrencyToBRL(value: number) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};

export function mesStringToNumber(mes: string): number {
    const meses = [
        "janeiro", "fevereiro", "marco", "abril", "maio", "junho",
        "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ];
    // Retorna o índice + 1 (1 para Janeiro, 2 para Fevereiro, etc). Retorna 1 se o mês não for encontrado.
    const index = meses.indexOf(mes.toLowerCase());
    return index !== -1 ? index + 1 : 1;
}
