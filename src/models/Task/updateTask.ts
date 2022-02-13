import { TaskType } from './Task.types';

const updateTask = (update: TaskType): TaskType => {
    const task = ({
        ...update,
        updatedAt: new Date().getTime(),
    })

    return task;
};

export default updateTask;

