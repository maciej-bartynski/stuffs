import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { TaskType } from 'models/Task/Task.types';

export const tasksAdapter = createEntityAdapter<TaskType>({
    selectId: task => task.id.__identifier,
});

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: tasksAdapter.getInitialState(),
    reducers: {
        createTask: tasksAdapter.addOne,
        deleteTask: tasksAdapter.removeOne,
        updateTask: tasksAdapter.setOne,
    },
});

export const { createTask, deleteTask, updateTask } = tasksSlice.actions;
export const { reducer: tasksReducer } = tasksSlice;
