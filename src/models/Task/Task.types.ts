import { LevelUuid } from "models/Level/Level.types";
import { StatusUuid } from "models/Status/Status.types";
import { UUIDType } from "tools/createUuid";

export interface TaskUuid extends UUIDType {}

export interface TaskForm {
    name: string;
    level?: LevelUuid;
    status?: StatusUuid;
    description?: string;
    subtasks: TaskUuid[];
    parent: TaskUuid | null;
}

export interface TaskType extends TaskForm {
    readonly id: TaskUuid;
    readonly createdAt: number;
    readonly updatedAt: number | null;
};

export interface TaskFormValidators {
    name: (name: string) => string,
}