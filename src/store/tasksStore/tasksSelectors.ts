import { Dictionary } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { TaskType, TaskUuid } from 'models/Task/Task.types';
import { tasksAdapter } from './tasksStore';

const tasksSelectors = tasksAdapter.getSelectors<RootState>(state => state.tasks);

export const getAllTasks = (state: RootState): TaskType[] => tasksSelectors.selectAll(state);

export const getAllTaskIds = (state: RootState): TaskUuid[] => {
    const ids = tasksSelectors.selectIds(state);
    return ids.map(stringId => tasksSelectors.selectById(state, stringId)?.id!);
};

export const getAllTaskEntities = (state: RootState): Dictionary<TaskType> => tasksSelectors.selectEntities(state);

export const getTaskById = (state: RootState, id: TaskUuid): TaskType | undefined =>
    tasksSelectors.selectById(state, id.__identifier);

export const getTasksTotal = (state: RootState): number => tasksSelectors.selectTotal(state);
