import { Dictionary } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { LevelForm, LevelType, LevelUuid } from 'models/Level/Level.types';
import { useCallback } from 'react';
import { getAllLevelEntities, getAllLevelIds, getAllLevels, getLevelById, getLevelsTotal } from './levelsSelectors';
import constructLevel from 'models/Level/createLevel';
import editLevel from 'models/Level/updateLevel';
import { levelsSlice } from './levelsStore';

const useLevelsStore = (
    id?: LevelUuid,
): {
    createLevel: (task: LevelForm) => void;
    updateLevel: (task: LevelType) => void;
    deleteLevel: (taskId: LevelUuid) => void;
    levels: LevelType[];
    levelIds: LevelUuid[];
    levelEntities: Dictionary<LevelType>;
    levelById: LevelType | undefined;
    levelsTotal: number;
} => {
    const state = useAppSelector(state => state);
    const dispatch = useAppDispatch();

    const createLevel = useCallback(
        (levelForm: LevelForm) => {
            const level = constructLevel(levelForm);
            dispatch(levelsSlice.actions.createLevel(level));
        },
        [dispatch],
    );

    const updateLevel = useCallback(
        (level: LevelType) => {
            const updation = editLevel(level);
            dispatch(levelsSlice.actions.updateLevel(updation));
        },
        [dispatch],
    );

    const deleteLevel = useCallback(
        (levelId: LevelUuid) => {
            dispatch(levelsSlice.actions.deleteLevel(levelId.__identifier));
        },
        [dispatch],
    );

    return {
        createLevel,
        updateLevel,
        deleteLevel,
        levels: getAllLevels(state),
        levelIds: getAllLevelIds(state),
        levelEntities: getAllLevelEntities(state),
        levelById: id ? getLevelById(state, id) : undefined,
        levelsTotal: getLevelsTotal(state),
    };
};

export default useLevelsStore;
