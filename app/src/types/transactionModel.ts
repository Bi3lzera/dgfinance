import { UserModel } from './userModel';
import { InstallmentModel } from './installmentModel';
import { BankAccountModel } from './bankAccountModel';
import { PaymentMethodModel } from './paymentMethodModel';
import { UserCardModel } from './userCardModel';
import { CreditCardBillModel } from './creditCardBillModel';

export interface TransactionModel {
    idTransaction: number;
    idInstallment: number | null;
    transactionDescription: string | null;
    value: number;
    date: string;
    type: string;
    idBankAccount: number;
    idPaymentMethod: number;
    idPaymentCard: number | null;
    idUser: number;
    idBill: number | null;
    created_at?: string;
    updated_at?: string;

    // Relacionamentos Eloquent
    user?: UserModel;
    installment?: InstallmentModel;
    bankAccount?: BankAccountModel;
    paymentMethod?: PaymentMethodModel;
    paymentCard?: UserCardModel;
    bill?: CreditCardBillModel;
}

export type Transaction = TransactionModel;

export interface CreateTransactionDTO {
    idInstallment?: number | null;
    transactionDescription?: string | null;
    value: number;
    date: string;
    type: string;
    idBankAccount: number;
    idPaymentMethod: number;
    idPaymentCard?: number | null;
    idBill?: number | null;
}

export interface UpdateTransactionDTO extends Partial<CreateTransactionDTO> {
    idTransaction: number;
}

export interface CompleteTransactionDTO {
    // Movement data
    title: string;
    description: string;
    totalValue: number;
    type: string;
    totalInstallments?: number | null;
    idCategory?: string | null;
    paymentRecurrencyMethod?: string | null;
    transferUUID?: string | null;

    // Installment data
    plannedDate?: string | null;
    expectedValue?: number | null;
    installmentNumber?: number | null;
    status?: string | null;

    // Transaction data
    transactionDescription?: string | null;
    value: number;
    date: string;
    idBankAccount: number;
    idPaymentMethod: number;
    idPaymentCard?: number | null;
    idBill?: number | null;

    // IDs para atualização completa (updateCompleteTransaction)
    idMovement?: number;
    idInstallment?: number;
    idTransaction?: number;
}
