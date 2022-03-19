import TaskItemAtoms, { TaskItemAtomsType } from "./TaskItem.atoms";
import useTasksStore from 'store/tasksStore/useTasksStore';
import { ListItemWrapperProps } from "atomic/molecules/DraggableTable/DraggableTable.type";
import context from "../context";
import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import { ANIMATION_FRAME_DURATION, TRANSITION_TIME_BASE } from "consts/variables";

const TaskItem: React.FC<ListItemWrapperProps & { Atoms?: TaskItemAtomsType }> = ({
    Atoms = TaskItemAtoms,
    selector
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const { pickedTask, blockOperations, setBlockOperations, mouseOverStatus } = context.useStatusColumnsContext();
    const { taskById, reorderTasks } = useTasksStore({ __identifier: selector! });
    const task = taskById!;
    const picked = pickedTask === selector;

    const throttlingTimer: MutableRefObject<NodeJS.Timeout | undefined> = useRef();
    const doubledThrottlingTimer: MutableRefObject<NodeJS.Timeout | undefined> = useRef();

    const onTasksOrderChange = useCallback((): void => {
        if (pickedTask && !blockOperations) {
            setBlockOperations(true);
            reorderTasks({ pickedId: { __identifier: pickedTask }, dropId: task.id });
            throttlingTimer.current = setTimeout(() => {
                setBlockOperations(false);
            }, TRANSITION_TIME_BASE);
        }
    }, [reorderTasks, pickedTask, task, setBlockOperations, blockOperations]);

    const taskOrderingAllowed = !!mouseOverStatus
        && mouseOverStatus === task.status?.__identifier;
    useEffect(() => {
        const onMouseOver = (e: MouseEvent) => {
            const { clientY } = e;
            if (!picked && !!pickedTask) {
                const box = ref.current?.getBoundingClientRect();
                if (box) {
                    const over = clientY <= box.bottom && clientY >= box.top;
                    if (over) {
                        // doubledThrottlingTimer.current && clearTimeout(doubledThrottlingTimer.current);
                        // doubledThrottlingTimer.current = setTimeout(() => onTasksOrderChange(), ANIMATION_FRAME_DURATION);
                        onTasksOrderChange()
                    }
                }
            }
        }

        if (taskOrderingAllowed) window.addEventListener("mousemove", onMouseOver)
        return (): void => {
            window.removeEventListener("mousemove", onMouseOver)
        }
    }, [task, picked, pickedTask, onTasksOrderChange, taskOrderingAllowed])

    return (
        <Atoms.Wrapper ref={ref}>
            <Atoms.Tile
                key={task.id.__identifier} picked={picked}
            >
                <Atoms.CardLabel>
                    Created: {task.createdAt}
                </Atoms.CardLabel>
                <Atoms.CardTitle>
                    {task.name}
                </Atoms.CardTitle>
            </Atoms.Tile>
        </Atoms.Wrapper>
    );
}

export default TaskItem;