import { UserCardModel } from './userCardModel';

export interface VirtualUserCardModel {
    idVirtualCard: number;
    idMainCard: number;
    finalCardNumber: string;
    description: string;

    // Relacionamento Eloquent
    mainCard?: UserCardModel;
}

export type VirtualUserCard = VirtualUserCardModel;

export interface CreateVirtualUserCardDTO {
    idMainCard: number;
    finalCardNumber: string;
    description: string;
}

export interface UpdateVirtualUserCardDTO extends Partial<CreateVirtualUserCardDTO> {
    idVirtualCard: number;
}
