import { Dictionary } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useCallback } from 'react';
import constructStatus from 'models/Status/createStatus';
import {
    getAllStatusEntities,
    getAllStatuses,
    getAllStatusIds,
    getStatusById,
    getStatusesTotal,
} from './statusesSelectors';
import { statusesSlice } from './statusesStore';
import { StatusForm, StatusType, StatusUuid } from 'models/Status/Status.types';

const useStatusesStore = (
    id?: StatusUuid,
): {
    createStatus: (statusForm: StatusForm) => void;
    updateStatus: (statusType: StatusType) => void;
    deleteStatus: (statusId: StatusUuid) => void;
    setAllStatuses: (statuses: StatusType[]) => void;
    statuses: StatusType[];
    statusIds: StatusUuid[];
    statusEntities: Dictionary<StatusType>;
    statusById: StatusType | undefined;
    statusesTotal: number;
} => {
    const state = useAppSelector(state => state);
    const dispatch = useAppDispatch();

    const createStatus = useCallback(
        (statusForm: StatusForm) => {
            const status = constructStatus(statusForm);
            dispatch(statusesSlice.actions.createStatus(status));
        },
        [dispatch],
    );

    const updateStatus = useCallback(
        (status: StatusType) => {
            const updatedAt = new Date();
            dispatch(statusesSlice.actions.updateStatus({ ...status, updatedAt }));
        },
        [dispatch],
    );

    const deleteStatus = useCallback(
        (statusId: StatusUuid) => {
            dispatch(statusesSlice.actions.deleteStatus(statusId.__identifier));
        },
        [dispatch],
    );

    const setAllStatuses = useCallback(
        (statuses: StatusType[]) => {
            dispatch(statusesSlice.actions.setAllStatuses(statuses));
        },
        [dispatch],
    );

    return {
        createStatus,
        updateStatus,
        deleteStatus,
        setAllStatuses,
        statuses: getAllStatuses(state),
        statusIds: getAllStatusIds(state),
        statusEntities: getAllStatusEntities(state),
        statusById: id ? getStatusById(state, id) : undefined,
        statusesTotal: getStatusesTotal(state),
    };
};

export default useStatusesStore;
