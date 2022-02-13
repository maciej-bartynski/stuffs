import { TaskForm, TaskFormValidators } from "./Task.types";

const taskFormInitializer: TaskForm = {
    name: "",
    description: "",
    level: undefined,
    status: undefined,
    subtasks: [],
    parent: null
}

const taskFormValidators: TaskFormValidators = {
    name: (name) => name ? "" : "Name for task is required",
}

const TaskFormUtils = {
    taskFormInitializer,
    taskFormValidators
}

export default TaskFormUtils