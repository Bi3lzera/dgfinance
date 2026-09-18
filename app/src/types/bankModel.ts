import { BankAccountModel } from './bankAccountModel';
import { UserCardModel } from './userCardModel';

export interface BankModel {
    idBank: number;
    name: string | null;
    codeCOMPE: string | null;
    created_at?: string;
    updated_at?: string;

    // Relacionamentos Eloquent
    bankAccounts?: BankAccountModel[];
    userCards?: UserCardModel[];
}

export type Bank = BankModel;

export interface CreateBankDTO {
    name: string;
    codeCOMPE?: string | null;
}

export interface UpdateBankDTO extends Partial<CreateBankDTO> {
    idBank: number;
}
