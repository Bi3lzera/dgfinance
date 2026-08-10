import axiosInstance from "../../../config/axiosConfig";

export interface BankAccountPayload {
    idAccount?: number;
    idBank: number | string;
    agencyNumber?: string | number;
    accountNumber?: string | number;
    accountAlias?: string;
    accountType?: string;
    referenceMonth?: string;
    initialValue?: number;
    notes?: string;
}

export interface BankItem {
    idBank: number;
    name: string;
    codeCOMPE?: string;
    logoUrl?: string;
    color?: string;
}

export const getAllAvailableBanks = async (): Promise<BankItem[]> => {
    try {
        const response = await axiosInstance.get(`/userbanks/allBanks`);
        if (response.data && Array.isArray(response.data)) {
            return response.data;
        }
    } catch (error) {
        console.warn("Could not fetch banks from API, using fallback list:", error);
    }
    return [];
};

export const createBankAccountApi = async (data: BankAccountPayload, callback?: () => void) => {
    try {
        const response = await axiosInstance.post('/userbanks/create', data);
        if (response.status === 200 || response.status === 201) {
            if (callback) callback();
            return response.data;
        }
    } catch (error) {
        console.error("Erro ao criar conta bancária:", error);
        throw error;
    }
};

export const updateBankAccountApi = async (id: number, data: BankAccountPayload, callback?: () => void) => {
    try {
        const response = await axiosInstance.put(`/userbanks/update/${id}`, data);
        if (response.status === 200) {
            if (callback) callback();
            return response.data;
        }
    } catch (error) {
        console.error("Erro ao atualizar conta bancária:", error);
        throw error;
    }
};

export const getBankAccountDetails = async (id: number) => {
    try {
        const response = await axiosInstance.get(`/userbanks/show/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar detalhes da conta bancária:", error);
        throw error;
    }
};
