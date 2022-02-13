import useTaskForm from 'hooks/useTaskForm';
import { LevelType } from 'models/Level/Level.types';
import { StatusType } from 'models/Status/Status.types';
import { TaskUuid } from 'models/Task/Task.types';

type Props = {
    children: (params: {
        error: string;
        setName: (name: string) => void;
        setDescription: (description: string) => void;
        setStatus: (status: StatusType | undefined) => void;
        setLevel: (level: LevelType | undefined) => void;
        statuses: StatusType[];
        levels: LevelType[];
        name: string;
        description: string;
        status: StatusType | undefined;
        level: LevelType | undefined;
        onSubmit: () => void;
        subtasks: TaskUuid[];
        subtasksToBe: TaskUuid[];
        setSubtask: (subtaskUuid: TaskUuid) => void;
        unsetSubtask: (subtaskUuid: TaskUuid) => void;
    }) => JSX.Element;
};

const AddTask: React.FC<Props> = ({ children }) => {
    const {
        name,
        setName,
        description,
        setDescription,
        level,
        setLevel,
        subtasks,
        setSubtask,
        unsetSubtask,
        parent,
        setParent,
        status,
        setStatus,
        subtasksToBe,
        parentsToBe,
        levelIds,
        statusIds,
    } = useTaskForm();

    return children({ } as any);
};

export default AddTask;
