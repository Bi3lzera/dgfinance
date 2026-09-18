import { UserModel } from './userModel';
import { CategoryModel } from './categoryModel';
import { InstallmentModel } from './installmentModel';

export type PaymentRecurrencyMethod = 'A' | 'R' | 'P' | string;

export interface MovementModel {
    idMovement: number;
    idUser: number;
    title: string;
    description: string;
    totalValue: number;
    type: string;
    totalInstallments: number | null;
    idCategory: string | null;
    paymentRecurrencyMethod: PaymentRecurrencyMethod | null;
    transferUUID: string | null;
    created_at?: string;
    updated_at?: string;

    // Relacionamentos Eloquent
    user?: UserModel;
    category?: CategoryModel;
    installments?: InstallmentModel[];
}

export type Movement = MovementModel;

export interface CreateMovementDTO {
    title: string;
    description: string;
    totalValue: number;
    type: string;
    totalInstallments?: number | null;
    idCategory?: string | number | null;
    paymentRecurrencyMethod?: PaymentRecurrencyMethod | null;
    transferUUID?: string | null;
}

export interface CreateMovementWithInstallmentsDTO extends CreateMovementDTO {
    date?: string;
    transactionDescription?: string;
    idBankAccount?: number | null;
    idPaymentMethod?: number | null;
}

export interface UpdateMovementDTO extends Partial<CreateMovementDTO> {
    idMovement: number;
}
