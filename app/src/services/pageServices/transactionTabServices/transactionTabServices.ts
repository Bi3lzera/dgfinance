import axiosInstance from "../../../../config/axiosConfig";
import { BankAccountTransaction } from "../../../pages/detailAccountPage/components/tabs/transacoesTab/transacoesTab";

export const getAllTransactionsByAccountApi = async (idAccount: number, initialDate: string, finalDate: string, signal?: AbortSignal): Promise<BankAccountTransaction[]> => {
    try {
        const response = await axiosInstance.get(`/userBankAccounts/getBankAccountTransactionList`, {
            params: {
                idAccount,
                initialDate,
                finalDate
            },
            signal
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar transações da conta bancária:", error);
        throw error;
    }
};