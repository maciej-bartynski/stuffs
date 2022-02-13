import { Dictionary } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { LevelType, LevelUuid } from 'models/Level/Level.types';
import { levelsAdapter } from './levelsStore';

const levelSelectors = levelsAdapter.getSelectors<RootState>(state => state.levels);

export const getAllLevels = (state: RootState): LevelType[] => levelSelectors.selectAll(state);

export const getAllLevelIds = (state: RootState): LevelUuid[] => {
    const ids = levelSelectors.selectIds(state);
    return ids.map(stringId => levelSelectors.selectById(state, stringId)?.id!);
};

export const getAllLevelEntities = (state: RootState): Dictionary<LevelType> => levelSelectors.selectEntities(state);

export const getLevelById = (state: RootState, id: LevelUuid): LevelType | undefined =>
    levelSelectors.selectById(state, id.__identifier);

export const getLevelsTotal = (state: RootState): number => levelSelectors.selectTotal(state);
