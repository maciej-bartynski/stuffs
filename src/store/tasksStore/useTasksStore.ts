import { Dictionary } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import constructTask from 'models/Task/createTask';
import editTask from 'models/Task/updateTask'
import { TaskForm, TaskType, TaskUuid } from 'models/Task/Task.types';
import { useCallback } from 'react';
import { getAllTaskEntities, getAllTaskIds, getAllTasks, getTaskById, getTasksTotal } from './tasksSelectors';
import { tasksSlice } from './tasksStore';
import { getStatusById } from 'store/statusesStore/statusesSelectors';

const useTasksStore = (
    id?: TaskUuid,
): {
    createTask: (task: TaskForm) => void;
    updateTask: (task: TaskType) => void;
    deleteTask: (taskId: TaskUuid) => void;
    reorderTasks: (params: {
        pickedId: TaskUuid,
        dropId: TaskUuid,
    }) => void;
    tasks: TaskType[];
    taskIds: TaskUuid[];
    taskEntities: Dictionary<TaskType>;
    taskById: TaskType | undefined;
    tasksTotal: number;
} => {
    const state = useAppSelector(state => state);
    const dispatch = useAppDispatch();

    const createTask = useCallback(
        (taskForm: TaskForm) => {
            const task = constructTask(taskForm);
            task.subtasks.forEach(subtaskUuid => {
                const subtask = getTaskById(state, subtaskUuid)
                subtask && dispatch(tasksSlice.actions.updateTask({ ...subtask, parent: task.id }))
            });
            const taskSameStatus = getAllTasks(state).filter(element => {
                if (!task.status || !element.status) return true; 
                return element.status.__identifier === task.status.__identifier
            })
            const importance = taskSameStatus.length;
            dispatch(tasksSlice.actions.createTask({
                ...task,
                importance
            }));
        },
        [dispatch, state],
    );

    const updateTask = useCallback(
        (task: TaskType) => {
            const updation = editTask(task);
            dispatch(tasksSlice.actions.updateTask(updation));
        },
        [dispatch],
    );

    const deleteTask = useCallback(
        (taskId: TaskUuid) => {
            dispatch(tasksSlice.actions.deleteTask(taskId.__identifier));
        },
        [dispatch],
    );

    const reorderTasks = useCallback((params: {
        pickedId: TaskUuid,
        dropId: TaskUuid,
    }) => {
        const { pickedId, dropId } = params;
        const allTasks = getAllTasks(state);
        const getStatus = getTaskById(state, pickedId)?.status;
        const restItems: TaskType[] = [] as TaskType[];
        const orderedItems = allTasks.filter(storedTask => {
            let isSameStatus = false
            if (storedTask.status && getStatus) {
                isSameStatus =  storedTask.status.__identifier ===  getStatus.__identifier;
            }

            else if (!storedTask.status && !getStatus) {
                isSameStatus =  true;
            }

            else isSameStatus =  false;

            if (!isSameStatus) {
                restItems.push(storedTask)
            }
            return isSameStatus;
        })
        const pickedSelector = pickedId.__identifier;
        const dropSelector = dropId.__identifier;

        if (orderedItems && dropSelector && pickedSelector) {
            const picked = orderedItems.find((item) => item.id.__identifier === pickedSelector)!;
            const dropped = orderedItems.find((item) => item.id.__identifier === dropSelector)!;
            if (picked && dropped && picked.importance !== dropped.importance) {
                const newOrder = orderedItems.reduce((result, item, idx, self) => {
                    if (idx === dropped.importance) {
                        const changing = picked.importance < dropped.importance
                            ? [dropped, picked]
                            : [picked, dropped];
                        return [...result, ...changing]
                    }
                    if (idx === picked.importance) return result;
                    return [...result, item]
                }, [] as typeof orderedItems)
                    .map((item, idx) => ({ ...item, importance: idx }));
                const tasksInCorrectOrder = computeTasksOrder(newOrder)
                dispatch(tasksSlice.actions.setAllTasks([...tasksInCorrectOrder, ...restItems]));
            }
        }
    }, [state, dispatch]);

    return {
        createTask,
        updateTask,
        deleteTask,
        reorderTasks,
        tasks: getAllTasks(state),
        taskIds: getAllTaskIds(state),
        taskEntities: getAllTaskEntities(state),
        taskById: id ? getTaskById(state, id) : undefined,
        tasksTotal: getTasksTotal(state),
    };
};

export default useTasksStore;

const computeTasksOrder = (tasks: TaskType[]): TaskType[] => {
    return tasks.sort((a, b) => a.importance - b.importance).map((task, idx) => ({
        ...task,
        importance: idx
    }))
}

