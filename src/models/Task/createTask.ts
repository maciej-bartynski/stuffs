import createUuid from 'tools/createUuid';
import { TaskForm, TaskType, TaskUuid } from './Task.types';

const constructTask = (taskFrom: TaskForm): TaskType => {
    const task = ({
        id: createUuid<TaskUuid>(),
        createdAt: new Date().getTime(),
        updatedAt: null,
        importance: 0,
        ...taskFrom,
    })

    return task;
};

export default constructTask;