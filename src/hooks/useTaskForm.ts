import useStatusesStore from "store/statusesStore/useStatusesStore";
import useLevelsStore from "store/levelsStore/useLevelsStore";
import useTasksStore from "store/tasksStore/useTasksStore";
import { useCallback } from "react";
import useForm from "./useForm";
import { Errors } from "tools/form/setErrors";
import { StatusUuid } from "models/Status/Status.types";
import { TaskForm, TaskUuid } from "models/Task/Task.types";
import TaskFormUtils from 'models/Task/Task.initializer'
import { LevelUuid } from "models/Level/Level.types";

const useTaskForm = (taskId?: TaskUuid): {
    errors: Errors<Partial<TaskForm>>;
    setName: (name: string) => void;
    setDescription: (description: string) => void;
    setStatus: (status: StatusUuid | undefined) => void;
    setLevel: (level: LevelUuid | undefined) => void;
    statusIds: StatusUuid[];
    levelIds: LevelUuid[];
    name: string | undefined;
    description: string | undefined;
    status: StatusUuid | undefined;
    level: LevelUuid | undefined;
    subtasks: TaskUuid[] | undefined;
    subtasksToBe: TaskUuid[];
    parent: TaskUuid | null | undefined;
    parentsToBe: TaskUuid[];
    setSubtask: (subtaskUuid: TaskUuid) => void;
    unsetSubtask: (subtaskUuid: TaskUuid) => void;
    setParent: (parent: TaskUuid | undefined) => void;
    dirty: boolean;
    valid: boolean;
    submit: () => void;
} => {

    const { tasks, createTask, updateTask, taskById } = useTasksStore(taskId);
    const { levelIds } = useLevelsStore();
    const { statusIds } = useStatusesStore();

    const {
        form,
        errors,
        setField,
        dirty,
        valid,
        submit,
    } = useForm<TaskForm>({
        initialValues: taskById || TaskFormUtils.taskFormInitializer,
        validators: TaskFormUtils.taskFormValidators,
        onSubmit: ({
            values,
            resetForm
        }) => {
            const performAction = taskById 
                ? ():void => updateTask({ ...taskById, ...values }) 
                : ():void => createTask(values);
            performAction();
            resetForm();
        }
    })

    const { 
        name, 
        subtasks, 
        status, 
        level, 
        description, 
        parent 
    } = form;

    const subtasksToBe = tasks.filter(task => !task.parent).map(task => task.id);
    const parentsToBe = tasks.filter(task => !subtasks?.some(subtask => subtask.__identifier === task.id.__identifier)).map(task => task.id)

    const setName = useCallback(
        (name: string) => {
            setField({ name });
        },
        [setField],
    );

    const setDescription = useCallback(
        (description: string) => {
            setField({ description });
        },
        [setField],
    );

    const setStatus = useCallback(
        (status: StatusUuid | undefined) => {
            setField({ status });
        },
        [setField],
    );

    const setLevel = useCallback(
        (level: LevelUuid | undefined) => {
            setField({ level });
        },
        [setField],
    );

    const setSubtask = useCallback((subtaskUuid: TaskUuid) => {
        setField({ subtasks: [...(subtasks || []), subtaskUuid] });
    }, [setField, subtasks]);

    const unsetSubtask = useCallback((subtaskUuid: TaskUuid) => {
        setField({ subtasks: subtasks?.filter(uuid => uuid.__identifier !== subtaskUuid.__identifier) });
    }, [setField, subtasks]);

    const setParent = useCallback(
        (parent: TaskUuid | undefined) => {
            setField({ parent });
        },
        [setField],
    );

    return ({
        errors,
        setName,
        setDescription,
        setStatus,
        setLevel,
        statusIds,
        levelIds,
        name,
        description,
        status,
        level,
        subtasks,
        subtasksToBe,
        parent,
        parentsToBe,
        setSubtask,
        unsetSubtask,
        setParent,
        dirty,
        valid,
        submit
    });
}

export default useTaskForm