import { UserModel } from './userModel';
import { BankModel } from './bankModel';
import { BankAccountModel } from './bankAccountModel';

export interface UserCardModel {
    idCard: number;
    idUser: number;
    idBank: number | null;
    idAccount: number | null;
    finalCardNumber: string | null;
    cardAlias: string | null;
    expirationDate: string | null;
    defaultPaymentMethod: number | null;
    creditLimit: number | null;
    status: string;
    created_at?: string;
    updated_at?: string;

    // Relacionamentos Eloquent
    user?: UserModel;
    bank?: BankModel;
    account?: BankAccountModel;

    // Retornado por consultas com join (ex: UserCardService::getUserCardList)
    bankName?: string;
}

export type UserCard = UserCardModel;

export interface CreateUserCardDTO {
    idBank?: number | null;
    idAccount?: number | null;
    finalCardNumber?: string | null;
    cardAlias?: string | null;
    expirationDate?: string | null;
    defaultPaymentMethod?: number | null;
    creditLimit?: number | null;
    status: string;
}

export interface UpdateUserCardDTO extends Partial<CreateUserCardDTO> {
    idCard: number;
}
