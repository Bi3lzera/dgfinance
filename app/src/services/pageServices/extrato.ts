import axiosInstance from "../../../config/axiosConfig"

export const getExtrato = async (initialDate: string, finalDate: string) => {
    const response = await axiosInstance.get(`/finance/extratoIndex/?initialDate=${initialDate}&finalDate=${finalDate}`);

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
            //isExpense: item.isExpense,
            status: item.installmentStatus,
        }
    });

    return extrato;
}