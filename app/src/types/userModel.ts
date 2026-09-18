import { TransactionModel } from './transactionModel';
import { BankAccountModel } from './bankAccountModel';
import { PaymentMethodModel } from './paymentMethodModel';
import { UserCardModel } from './userCardModel';
import { CategoryModel } from './categoryModel';
import { MovementModel } from './movementModel';

export interface UserModel {
    idUser: number;
    name: string | null;
    email: string | null;
    cpf: string | null;
    email_verified_at?: string | null;
    password?: string;
    remember_token?: string | null;
    created_at?: string;
    updated_at?: string;

    // Relacionamentos Eloquent
    transactions?: TransactionModel[];
    bankAccounts?: BankAccountModel[];
    paymentMethods?: PaymentMethodModel[];
    userCards?: UserCardModel[];
    categories?: CategoryModel[];
    movements?: MovementModel[];
}

export type User = UserModel;

export interface CreateUserDTO {
    name: string;
    email: string;
    cpf?: string | null;
    password?: string;
}

export interface UpdateUserDTO extends Partial<CreateUserDTO> {
    idUser: number;
}
