import ColumnAtoms, { ColumnAtomsType } from "./StatusItem.atoms";
import AddTaskForm from "components/AddTaskForm";
import useStatusesStore from 'store/statusesStore/useStatusesStore';
import useTasksStore from "store/tasksStore/useTasksStore";
import { GAP_SPACE, TILE_HEIGHT_PX, VIEW_HEIGHT } from "../StatusColumns.lib";
import { ListItemWrapperProps } from "atomic/molecules/DraggableTable/DraggableTable.type";
import context from "../context";
import { useEffect, useRef } from "react";

const HEADER_HEIGHT = 30;
const PLACEHOLDER_HEIGHT = 50;
const PADDING_BOTTOM_HEIGHT = 50;

const StatusItem: React.FC<ListItemWrapperProps & { Atoms?: ColumnAtomsType }> = ({
    children,
    Atoms = ColumnAtoms,
    selector,
    itemSpace,
    childListItems
}) => {

    const ref = useRef<HTMLDivElement>(null);
    const {
        pickedStatus,
        pickedTask,
        setMouseOverStatus,
        mouseOverStatus,
    } = context.useStatusColumnsContext();
    const { statusById } = useStatusesStore({ __identifier: selector });
    const status = statusById!;
    const columnWidth = itemSpace!;
    const contentHeight = (childListItems!.length * (TILE_HEIGHT_PX + GAP_SPACE)) - GAP_SPACE + PADDING_BOTTOM_HEIGHT;
    const picked = pickedStatus === selector;

    const {
        tasks,
        updateTask
    } = useTasksStore();

    const pickedTaskFromCurrentStatus = tasks.some(task =>
        task.id.__identifier === pickedTask
        && task.status?.__identifier === selector
    );

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const currentStatusBox = ref.current?.getBoundingClientRect();

            const mouseOverCurrentStatus = currentStatusBox
                ? clientX <= currentStatusBox.right
                && clientX >= currentStatusBox.left
                && clientY <= currentStatusBox.bottom
                && clientY >= currentStatusBox.top
                : false;

            const currentStatusSetAsMouseOverStatus = mouseOverStatus === selector;

            if (mouseOverCurrentStatus) {
                setMouseOverStatus(selector);
            }

            if (!mouseOverCurrentStatus && currentStatusSetAsMouseOverStatus) {
                setMouseOverStatus(undefined);
            }
        }

        const currentStatusIsNotPicked = pickedStatus && pickedStatus !== selector;
        const currentStatusIsNotParentOfPickedTask = !pickedTaskFromCurrentStatus;
        const canBeDropZone = currentStatusIsNotPicked && currentStatusIsNotParentOfPickedTask;

        if (canBeDropZone) window.addEventListener("mousemove", onMouseMove);

        return (): void => {
            window.removeEventListener("mousemove", onMouseMove)
        }
    }, [
        pickedTask,
        pickedStatus,
        tasks,
        selector,
        updateTask,
        setMouseOverStatus,
        pickedTaskFromCurrentStatus,
        mouseOverStatus
    ]);

    return (
        <Atoms.Column
            ref={ref}
            width={columnWidth}
            picked={picked}
            maxHeight={VIEW_HEIGHT}
            height={contentHeight + HEADER_HEIGHT}
            minHeight={PLACEHOLDER_HEIGHT + HEADER_HEIGHT}
        >
            <Atoms.Header>
                <Atoms.Title
                    title={status.name}
                >
                    {status.name}
                </Atoms.Title>
                <Atoms.Delete
                    onClick={(): void => { }}
                >
                    x
                </Atoms.Delete>
            </Atoms.Header>
            <Atoms.Outer headerHeight={HEADER_HEIGHT}>
                <Atoms.Content>
                    <Atoms.Inner
                        width={columnWidth}
                        height={contentHeight}
                    >
                        {children}
                    </Atoms.Inner>
                </Atoms.Content>
            </Atoms.Outer>
            <Atoms.Footer>
                <AddTaskForm status={status.id} />
            </Atoms.Footer>
        </Atoms.Column>
    )
}

export default StatusItem;
