import { v4 } from 'uuid';

export interface UUIDType {
    readonly __identifier: string;
}

type CustomUuid<T> = UUIDType extends T ? T : UUIDType;
function createUuid<T>(): CustomUuid<T> {
    const uuid = Object.freeze({
        __identifier: v4(),
    })
    
    return uuid as CustomUuid<T>;
}

export default createUuid;
