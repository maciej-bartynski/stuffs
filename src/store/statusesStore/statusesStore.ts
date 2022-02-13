import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StatusType } from 'models/Status/Status.types';

export const statusesAdapter = createEntityAdapter<StatusType>({
    selectId: status => status.id.__identifier,
});

export const statusesSlice = createSlice({
    name: 'statuses',
    initialState: statusesAdapter.getInitialState(),
    reducers: {
        createStatus: statusesAdapter.addOne,
        deleteStatus: statusesAdapter.removeOne,
        updateStatus: statusesAdapter.setOne,
        setAllStatuses: statusesAdapter.setAll
    },
});

export const { createStatus, deleteStatus, updateStatus, setAllStatuses } = statusesSlice.actions;
export const { reducer: statusesReducer } = statusesSlice;
