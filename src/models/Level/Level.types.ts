import { UUIDType } from "tools/createUuid";

export interface LevelUuid extends UUIDType { }

export enum LevelColor {
    Red = 'red',
    Green = 'green',
    Blue = 'blue',
    Gray = 'gray',
    Purple = 'purple',
}

export interface LevelForm {
    readonly name: string;
    readonly color: LevelColor;
}

export interface LevelType extends LevelForm {
    readonly id: LevelUuid;
    readonly createdAt: Date;
    readonly updatedAt: Date | null;
}

export interface LevelFormValidatorion {
    name: (name: string) => string,
    color: (color: LevelColor) => string,
}