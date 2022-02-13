import { LevelType } from './Level.types';

const updateLevel = (updation: LevelType): LevelType => {
    const level = {
        ...updation,
        updatedAt: new Date(),
    } 
    return level
}

export default updateLevel;
