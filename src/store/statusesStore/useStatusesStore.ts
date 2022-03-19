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
import { getAllTasks } from 'store/tasksStore/tasksSelectors';
import useTasksStore from 'store/tasksStore/useTasksStore';

const useStatusesStore = (
    id?: StatusUuid,
): {
    createStatus: (statusForm: StatusForm) => void;
    updateStatus: (statusType: StatusType) => void;
    deleteStatus: (statusId: StatusUuid) => void;
    setAllStatuses: (statuses: StatusType[]) => void;
    reorderStatuses: (params: {
        pickedId: StatusUuid;
        dropId: StatusUuid;
    }) => void;
    statuses: StatusType[];
    statusIds: StatusUuid[];
    statusEntities: Dictionary<StatusType>;
    statusById: StatusType | undefined;
    statusesTotal: number;
} => {
    const state = useAppSelector(state => state);
    const { updateTask } = useTasksStore();
    const dispatch = useAppDispatch();

    const createStatus = useCallback(
        (statusForm: StatusForm) => {
            const status = constructStatus(statusForm);
            dispatch(statusesSlice.actions.createStatusReorderRest(status));
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
            const tasks = getAllTasks(state)
            tasks.forEach(task => {
                if (task.status?.__identifier === statusId.__identifier) {
                    updateTask({
                        ...task,
                        status: undefined
                    })
                }
            });

            dispatch(statusesSlice.actions.deleteStatusReorderRest(statusId.__identifier));
        },
        [dispatch, state, updateTask],
    );

    const setAllStatuses = useCallback(
        (statuses: StatusType[]) => {
            const statusesInCorrectOrder = computeStatusesOrder(statuses)
            dispatch(statusesSlice.actions.setAllStatuses(statusesInCorrectOrder));
        },
        [dispatch],
    );

    const reorderStatuses = useCallback((params: {
        pickedId: StatusUuid,
        dropId: StatusUuid,
    }) => {
        const { pickedId, dropId } = params;
        const orderedItems = getAllStatuses(state);
        const pickedSelector = pickedId.__identifier;
        const dropSelector = dropId.__identifier;

        if (orderedItems && dropSelector && pickedSelector) {
            const picked = orderedItems.find((item) => item.id.__identifier === pickedSelector)!;
            const dropped = orderedItems.find((item) => item.id.__identifier === dropSelector)!;
            if (picked?.order !== dropped?.order && picked && dropped) {
                const newOrder = orderedItems.reduce((result, item, idx, self) => {
                    if (idx === dropped.order) {
                        const changing = picked.order < dropped.order
                            ? [dropped, picked]
                            : [picked, dropped];
                        return [...result, ...changing]
                    }
                    if (idx === picked.order) return result;
                    return [...result, item]
                }, [] as typeof orderedItems)
                    .map((item, idx) => ({ ...item, order: idx }));
                // const statusesInCorrectOrder = computeStatusesOrder(newOrder)
                dispatch(statusesSlice.actions.setAllStatuses(newOrder));

            }
        }
    }, [state, dispatch]);

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
        reorderStatuses
    };
};

export default useStatusesStore;

const computeStatusesOrder = (statuses: StatusType[]): StatusType[] => {
    return statuses.sort((a, b) => a.order - b.order).map((status, idx) => ({
        ...status,
        order: idx
    }))
}
