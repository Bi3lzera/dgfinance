import { BankModel } from './bankModel';
import { UserModel } from './userModel';

export interface BankAccountModel {
    idAccount: number;
    idUser: number;
    idBank: number;
    agencyNumber: string | null;
    accountNumber: string | null;
    accountAlias: string | null;
    accountType: string | null;
    initialValue: number | null;
    isOpenFinance: string | boolean;
    openFinanceItemId: string;
    institutionUrl: string;
    created_at?: string;
    updated_at?: string;

    // Relacionamentos Eloquent
    user?: UserModel;
    bank?: BankModel;

    // Atributos retornados em consultas com join (UserAccountService)
    bankName?: string;
}

export type BankAccount = BankAccountModel;

export interface CreateBankAccountDTO {
    idBank: number;
    agencyNumber?: string | null;
    accountNumber?: string | null;
    accountAlias?: string | null;
    accountType?: string | null;
    initialValue?: number | null;
    isOpenFinance?: string | boolean;
    openFinanceItemId?: string;
    institutionUrl?: string;
}

export interface UpdateBankAccountDTO extends Partial<CreateBankAccountDTO> {
    idAccount: number;
}
