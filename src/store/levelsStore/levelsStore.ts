import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { LevelType } from 'models/Level/Level.types';

export const levelsAdapter = createEntityAdapter<LevelType>({
    selectId: level => level.id.__identifier,
});

export const levelsSlice = createSlice({
    name: 'levels',
    initialState: levelsAdapter.getInitialState(),
    reducers: {
        createLevel: levelsAdapter.addOne,
        deleteLevel: levelsAdapter.removeOne,
        updateLevel: levelsAdapter.setOne,
    },
});

export const { createLevel, deleteLevel, updateLevel } = levelsSlice.actions;
export const { reducer: levelsReducer } = levelsSlice;
