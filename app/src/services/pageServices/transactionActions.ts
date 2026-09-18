import axiosInstance from "../../../config/axiosConfig"
import * as type from "../../types";

export const createCompleteTransactionApi = async (transactionData: type.CompleteTransactionDTO | type.TransactionModel, onSuccess?: () => void) => {
    try {
        await axiosInstance.post('/finance/createCompleteTransaction', transactionData);
        if (onSuccess) {
            onSuccess();
        }
    } catch (error) {
        console.error('Erro ao criar a transação completa:', error);
    }
}

export const createMovementWithInstallments = async (
    movementData: type.CreateMovementWithInstallmentsDTO | type.CreateMovementDTO | type.MovementModel,
    installmentData: type.CreateInstallmentDTO[] | type.InstallmentModel[],
    onSuccess?: () => void
) => {
    try {
        await axiosInstance.post('/finance/createMovementWithInstallments', { movement: movementData, installments: installmentData });
        if (onSuccess) {
            onSuccess();
        }
    } catch (error) {
        console.error('Erro ao criar a movimentação com parcelas:', error);
    }
}

export const updateCompleteTransactionApi = async (transactionData: type.CompleteTransactionDTO | type.TransactionModel, onSuccess?: () => void) => {
    try {
        await axiosInstance.put('/finance/updateCompleteTransaction', transactionData);
        if (onSuccess) {
            onSuccess();
        }
    } catch (error) {
        console.error('Erro ao atualizar a transação completa:', error);
    }
}

export const getInstallmentsApi = async (movementId: number) => {
    try {
        const response = await axiosInstance.get('/finance/installmentIndex', {
            params: {
                movementId
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar parcelas:', error);
    }
}

export const getTransactionDetails = async (id: number) => {
    try {
        const response = await axiosInstance.get('/finance/transactionDetails', {
            params: {
                id
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar detalhes da transação:', error);
    }
}