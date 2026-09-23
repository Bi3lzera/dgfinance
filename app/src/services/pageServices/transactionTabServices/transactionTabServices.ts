import axiosInstance from "../../../../config/axiosConfig";
import { BankAccountTransaction } from "../../../pages/detailAccountPage/components/transacoesTab";

export const getAllTransactionsByAccountApi = async (idAccount: number): Promise<BankAccountTransaction[]> => {
    try {
        const response = await axiosInstance.get(`/userBankAccounts/getBankAccountTransactionList`, {
            params: {
                idAccount
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar transações da conta bancária:", error);
        throw error;
    }
};