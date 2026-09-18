import { MovementModel } from './movementModel';
import { TransactionModel } from './transactionModel';

export interface InstallmentModel {
    idInstallment: number;
    idMovement: number | null;
    plannedDate: string | null;
    expectedValue: number | null;
    installmentNumber: number | null;
    status: string | null;
    created_at?: string;
    updated_at?: string;

    // Relacionamentos Eloquent
    movement?: MovementModel;
    transactions?: TransactionModel[];

    // Campos retornados em consultas com join (ex: TransactionService::getAllInstallments)
    movement_description?: string;
    totalInstallments?: number;
    idTransaction?: number;
    transactionValuePaid?: number;
    paymentMethod?: string;
}

export type Installment = InstallmentModel;

export interface CreateInstallmentDTO {
    idMovement?: number | null;
    plannedDate?: string | null;
    expectedValue?: number | null;
    installmentNumber?: number | null;
    status?: string | null;
}

export interface UpdateInstallmentDTO extends Partial<CreateInstallmentDTO> {
    idInstallment: number;
}
