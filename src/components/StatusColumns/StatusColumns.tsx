import AddStatusForm from "components/AddStatusForm";
import useStatusesStore from "store/statusesStore/useStatusesStore";
import StatusColumnsAtoms, { StatusColumnsAtomsType } from "./StatusColumns.atoms";
import useTasksStore from 'store/tasksStore/useTasksStore';
import React, { MutableRefObject, useCallback, useMemo, useRef, useState } from "react";
import context from "./context";
import DraggableTable from "atomic/molecules/DraggableTable";
import { TaskType } from "models/Task/Task.types";
import { StatusType } from "models/Status/Status.types";
import StatusItem from "./StatusItem";
import TaskItem from "./TaskItem";
import { ANIMATION_FRAME_DURATION, TRANSITION_TIME_BASE } from "consts/variables";

type StatusColumnsProps = {
    Atoms?: StatusColumnsAtomsType,
}

const StatusColumns: React.FC<StatusColumnsProps> = ({
    Atoms = StatusColumnsAtoms,
}) => {
    const [mouseOverStatus, _setMouseOverStatus] = useState<string>();
    const [pickedStatus, setPickedStatus] = useState<StatusType["id"]["__identifier"]>();
    const [pickedTask, setPickedTask] = useState<TaskType["id"]["__identifier"]>();
    const [blockOperations, setBlockOperations] = useState<boolean>(false);

    const {
        statuses,
        reorderStatuses
    } = useStatusesStore();

    const { tasks } = useTasksStore();

    const stateChangesAllowed = !blockOperations;

    const throttlingTimer: MutableRefObject<NodeJS.Timeout | undefined> = useRef();
    const allowStateChanges = useCallback(() => {
        function allowStateChangesOnAnimationEnd() {
            throttlingTimer.current && clearTimeout(throttlingTimer.current)
            return setTimeout(() => {
                setBlockOperations(false);
            }, TRANSITION_TIME_BASE + ANIMATION_FRAME_DURATION);
        }
        throttlingTimer.current = allowStateChangesOnAnimationEnd();
    }, [setBlockOperations]);

    const disallowStateChanges = useCallback(() => {
        setBlockOperations(true);
    }, [setBlockOperations]);

    const pickTask = useCallback((param: { selector?: string }) => {
        setPickedTask(param.selector);
    }, [setPickedTask]);

    const dropTask = useCallback(() => {
        setPickedTask(undefined);
    }, [setPickedTask]);

    const pickStatus = useCallback((param: { selector?: string }) => {
        setPickedStatus(param.selector);
    }, [setPickedStatus]);

    const dropStatus = useCallback(() => {
        setPickedStatus(undefined);
    }, [setPickedStatus]);

    const setMouseOverStatus = useCallback((selector?: string) => {
        _setMouseOverStatus(selector);
        if (pickedStatus && stateChangesAllowed) {
            disallowStateChanges();
            reorderStatuses({
                pickedId: { __identifier: pickedStatus! },
                dropId: { __identifier: selector! }
            });
            allowStateChanges();
        }
    }, [disallowStateChanges, pickedStatus, reorderStatuses, allowStateChanges, stateChangesAllowed]);

    const onStatusOrderChange = useCallback((): void => {

    }, [

    ]);

    const contextValue = useMemo(() => ({
        pickedTask,
        pickedStatus,
        blockOperations, setBlockOperations,
        mouseOverStatus, setMouseOverStatus,
        onStatusOrderChange
    }), [
        pickedTask,
        pickedStatus,
        blockOperations, setBlockOperations,
        mouseOverStatus, setMouseOverStatus,
        onStatusOrderChange
    ]);

    const pickedTaskData = pickedTask ? tasks.find(task => task.id.__identifier === pickedTask) : null;
    const pickedTaskOriginStatus = pickedTaskData?.status?.__identifier || null;

    const tableItems = useMemo(() => {

        return {
            selector: "nested-list",
            parentList: undefined,
            childListHorizontal: true,
            childListDisableTransverseDragging: true,
            childListItemSpace: 250,
            childListGapSpace: 20,
            ChildListItemComponent: StatusItem,
            childListOnPick: pickStatus,
            childListOnDrop: dropStatus,
            childListItems: statuses.map(status => {
                return {
                    selector: status.id.__identifier,
                    parentList: "nested-list",
                    childListHorizontal: false,
                    childListDisableTransverseDragging: false,
                    childListItemSpace: 150,
                    childListGapSpace: 10,
                    ChildListItemComponent: TaskItem,
                    childListOnPick: pickTask,
                    childListOnDrop: dropTask,
                    dropZoneMode: !!pickedTaskOriginStatus && status.id.__identifier !== pickedTaskOriginStatus,
                    childListItems: tasks.map(task => {
                        const toReturn = task.status?.__identifier === status.id.__identifier ? {
                            selector: task.id.__identifier,
                            parentList: status.id.__identifier,
                        } : null;
                        return toReturn!
                    }).filter(item => item)
                }
            })
        }
    }, [statuses, tasks, pickTask, dropTask, pickStatus, dropStatus, pickedTaskOriginStatus]);


    return (
        <div>
            <div>Board new</div>
            <context.StatusColumnContextProvider value={contextValue}>
                <Atoms.Positioner>
                    <DraggableTable
                        {...tableItems}
                    />
                </Atoms.Positioner>
            </context.StatusColumnContextProvider>
        </div>
    )
}

export default StatusColumns;
