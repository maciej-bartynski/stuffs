import createUuid from 'tools/createUuid';
import { LevelForm, LevelType, LevelUuid } from './Level.types';

const createLevel = (levelForm: LevelForm): LevelType => {
    const level = {
        id: createUuid<LevelUuid>(),
        createdAt: new Date(),
        updatedAt: null,
        ...levelForm,
    } as LevelType;

    return level
}

export default createLevel;
