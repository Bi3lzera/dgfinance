import { UserCardModel } from './userCardModel';
import { TransactionModel } from './transactionModel';

export interface CreditCardBillModel {
    idBill: number;
    uuidBill: string;
    idCard: number;
    billForecastDate: string;
    billClosingDate: string;
    billStatus: string;
    dueDate: string;
    paymentDate: string;
    paymentMode: string;
    paymentValue: number;

    // Relacionamentos Eloquent
    card?: UserCardModel;
    transactions?: TransactionModel[];
}

export type CreditCardBill = CreditCardBillModel;

export interface CreateCreditCardBillDTO {
    uuidBill: string;
    idCard: number;
    billForecastDate: string;
    billClosingDate: string;
    billStatus: string;
    dueDate: string;
    paymentDate: string;
    paymentMode: string;
    paymentValue: number;
}

export interface UpdateCreditCardBillDTO extends Partial<CreateCreditCardBillDTO> {
    idBill: number;
}
