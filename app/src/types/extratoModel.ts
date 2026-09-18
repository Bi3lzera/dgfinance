export interface ExtratoModel {
    id: string;
    data: string;
    title: string;
    tag: string;
    institution: string;
    institutionDot: string;
    amount: string;
    paymentType: string;
    transactionType: string;
    status: string;
}

export interface ExtratoDetailsModel {
    idTransaction?: number;
    idInstallment?: number;
    idMovement?: number;
    title: string;
    description: string;
    totalValue: number;
    type: string;
    totalPaymentCount: number;
    idCategory: number;
    date: string,
    plannedDate: string,
    expectedValue: number,
    installmentNumber: number,
    status: string,
    paymentRecurrencyMethod: string,
    transactionDescription: string,
    value: number,
    idBankAccount: number,
    idPaymentMethod: number,
    idPaymentCard: number
}