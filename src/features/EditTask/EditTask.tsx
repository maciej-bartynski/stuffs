import { TaskUuid } from 'models/Task/Task.types';
import useTasksStore from 'store/tasksStore'

type EditTaskProps = {
    taskId: TaskUuid
}

const EditTask: React.FC<EditTaskProps> = ({
    taskId,
}) => {
    const { updateTask, taskById } = useTasksStore(taskId);


    return null;
}

export default EditTask