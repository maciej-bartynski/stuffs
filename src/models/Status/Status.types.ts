import { UUIDType } from 'tools/createUuid';

export interface StatusUuid extends UUIDType { }

export interface StatusForm {
    readonly name: string;
    readonly order: number;
}

export interface StatusType extends StatusForm {
    readonly id: StatusUuid;
    readonly createdAt: Date;
    readonly updatedAt: Date | null;
};

export interface StatusValidation {
    readonly name: (name: string) => string;
    readonly order: (order: number) => string;
}