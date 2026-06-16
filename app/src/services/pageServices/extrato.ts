import axiosInstance from "../../../config/axiosConfig"

export const getExtrato = async (initialDate: string, finalDate: string, signal?: AbortSignal) => {
    const response = await axiosInstance.get(`/finance/extratoIndex/?initialDate=${initialDate}&finalDate=${finalDate}`, { signal });

    const extrato = response.data.map((item: any) => {
        return {
            id: item.idTransaction,
            data: item.transactionDate,
            title: item.movementTitle,
            tag: item.categoryTitle,
            institution: item.bankName,
            //institutionDot: item.bancoDot,
            amount: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(item.transactionValue)),
            paymentType: item.paymentMethodName,
            transactionType: ['debito', 'despesa'].includes(String(item.transactionType).toLowerCase()) ? 'Despesa' : 'Receita',
            status: item.installmentStatus,
        }
    });

    return extrato;
}