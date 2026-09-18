import { UserModel } from './userModel';

export interface PaymentMethodModel {
    idPayMethod: number;
    description: string;
    payMethodType: string;
    idUser: number | null;
    created_at?: string;
    updated_at?: string;

    // Relacionamento Eloquent
    user?: UserModel;

    // Alias comumente utilizado em respostas da API (ex: UserService::getPaymentMethods)
    idPaymentMethod?: number;
}

export type PaymentMethod = PaymentMethodModel;

export interface CreatePaymentMethodDTO {
    description: string;
    payMethodType: string;
    idUser?: number | null;
}

export interface UpdatePaymentMethodDTO extends Partial<CreatePaymentMethodDTO> {
    idPayMethod: number;
}
