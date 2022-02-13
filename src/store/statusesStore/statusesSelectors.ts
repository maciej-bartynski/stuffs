import { Dictionary } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { StatusType, StatusUuid } from 'models/Status/Status.types';
import { statusesAdapter } from './statusesStore';

const statusSelectors = statusesAdapter.getSelectors<RootState>(state => state.statuses);

export const getAllStatuses = (state: RootState): StatusType[] => statusSelectors.selectAll(state);

export const getAllStatusIds = (state: RootState): StatusUuid[] => {
    const ids = statusSelectors.selectIds(state);
    return ids.map(stringId => statusSelectors.selectById(state, stringId)?.id!);
};

export const getAllStatusEntities = (state: RootState): Dictionary<StatusType> => statusSelectors.selectEntities(state);

export const getStatusById = (state: RootState, id: StatusUuid): StatusType | undefined =>
    statusSelectors.selectById(state, id.__identifier);

export const getStatusesTotal = (state: RootState): number => statusSelectors.selectTotal(state);
