import axiosInstance from "../../../config/axiosConfig"

export const getExtrato = async (mes: string, ano: number) => {
    const response = await axiosInstance.get(`/lancamentos/efetivado/?mes=${mes}&ano=${ano}`);

    const extrato = response.data.map((item: any) => {
        return {
            id: item.id,
            data: item.dataOperacao,
            title: item.descricao,
            tag: item.tag,
            institution: item.bancoNome,
            //institutionDot: item.bancoDot,
            amount: item.valor,
            paymentType: item.formaPagamentoNome,
            //isExpense: item.isExpense,
            status: item.status,
        }
    });

    return extrato;
}