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
        setAllStatuses: statusesAdapter.setAll,
        deleteStatusReorderRest: (state, action) => {
            const { payload } = action;
            const newStatuses = Object.values(state.entities).filter(item => item && item.id.__identifier !== payload) as StatusType[];
            const sortedStatuses = computeStatusesOrder(newStatuses);
            const preparedStatuses = sortedStatuses.reduce((result, item) => {
                return {
                    ...result,
                    [item.id.__identifier]: item
                }
            }, {});
            const ids = sortedStatuses.map(item => item.id.__identifier);
            return {
                ...state,
                entities: preparedStatuses,
                ids: ids
            }
        },
        createStatusReorderRest: (state, action) => {
            const newState = {
                ...state,
                entities: {
                    ...state.entities,
                    [action.payload.id.__identifier]: {
                        ...action.payload,
                        order: Object.values(state.entities).length
                    }
                },
                ids: Object.values(state.entities).map(item => item?.id.__identifier).filter(id => !!id).concat([action.payload.id.__identifier]) as string[]
            }
            return newState
        }
    },
});

export const { createStatus, deleteStatus, updateStatus, setAllStatuses } = statusesSlice.actions;
export const { reducer: statusesReducer } = statusesSlice;

const computeStatusesOrder = (statuses: StatusType[]): StatusType[] => {
    return statuses.sort((a, b) => a.order - b.order).map((status, idx) => ({
        ...status,
        order: idx
    }))
}