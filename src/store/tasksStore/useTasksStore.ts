import { Dictionary } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import constructTask from 'models/Task/createTask';
import editTask from 'models/Task/updateTask'
import { TaskForm, TaskType, TaskUuid } from 'models/Task/Task.types';
import { useCallback } from 'react';
import { getAllTaskEntities, getAllTaskIds, getAllTasks, getTaskById, getTasksTotal } from './tasksSelectors';
import { tasksSlice } from './tasksStore';

const useTasksStore = (
    id?: TaskUuid,
): {
    createTask: (task: TaskForm) => void;
    updateTask: (task: TaskType) => void;
    deleteTask: (taskId: TaskUuid) => void;
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
            })
            dispatch(tasksSlice.actions.createTask(task));
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

    return {
        createTask,
        updateTask,
        deleteTask,
        tasks: getAllTasks(state),
        taskIds: getAllTaskIds(state),
        taskEntities: getAllTaskEntities(state),
        taskById: id ? getTaskById(state, id) : undefined,
        tasksTotal: getTasksTotal(state),
    };
};

export default useTasksStore;
