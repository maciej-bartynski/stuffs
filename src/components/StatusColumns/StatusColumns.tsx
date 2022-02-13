import AddStatusForm from "components/AddStatusForm";
import useStatusesStore from "store/statusesStore/useStatusesStore";
import StatusColumnStylesheet, { StatusColumnStylesheetType } from "./StatusColumns.stylesheet";
import useTasksStore from 'store/tasksStore/useTasksStore';
import { useCallback, useMemo, useState } from "react";
import { StatusUuid } from "models/Status/Status.types";
import Card from "atomic/atoms/Card";
import { StatusColumnsContextProvider } from "./StatusColumns.context";
import Column from "./Column";
import { getTranslateValue, swipeStatuses, useCalculateTrackHeight } from "./lib";

type StatusColumnsProps = {
    Atoms?: StatusColumnStylesheetType
}
const StatusColumns: React.FC<StatusColumnsProps> = ({
    Atoms = StatusColumnStylesheet
}) => {

    const trackRef = useCalculateTrackHeight();

    const {
        statuses,
        deleteStatus,
        setAllStatuses
    } = useStatusesStore();

    const [focusedColumn, setFocusedColumn] = useState<StatusUuid | null>(null);
    const [lockedColumn, setLockedColumn] = useState<StatusUuid | null>(null);
    const [dropZone, setDropZone] = useState<StatusUuid | null>(null);

    const pickColumn = useCallback((statusUuid: StatusUuid) => {
        setLockedColumn(statusUuid);
    }, [setLockedColumn]);

    const shuffleColumns = useCallback((dropZone: null | StatusUuid) => {
        if (lockedColumn && dropZone && statuses.length) {
            const swipedStatuses = swipeStatuses(lockedColumn, dropZone, statuses);
            setAllStatuses(swipedStatuses);
        }
    }, [lockedColumn, statuses, setAllStatuses])

    const dropColumn = useCallback(() => {
        shuffleColumns(dropZone)
        setLockedColumn(null);
        setDropZone(null);
    }, [shuffleColumns, dropZone]);


    const moveOverDropZone = useCallback((statusUuid: StatusUuid) => {
        setDropZone(statusUuid);
        shuffleColumns(statusUuid);
    }, [shuffleColumns])

    const { tasks, updateTask } = useTasksStore();

    const removeStatus = useCallback((statusUuid: StatusUuid) => {
        tasks.forEach(task => {
            if (task.status?.__identifier === statusUuid.__identifier) {
                updateTask({
                    ...task,
                    status: undefined
                })
            }
        });

        deleteStatus(statusUuid);
    }, [tasks, updateTask, deleteStatus])

    return (
        <StatusColumnsContextProvider
            value={useMemo(() => ({
                statuses,
                removeStatus,

                lockedColumn,
                pickColumn,
                dropColumn,
                shuffleColumns,

                dropZone,
                setDropZone,
                moveOverDropZone,

                focusedColumn,
                setFocusedColumn
            }), [
                statuses,
                removeStatus,
                lockedColumn,
                pickColumn,
                dropColumn,
                dropZone,
                setDropZone,
                moveOverDropZone,
                shuffleColumns,
                focusedColumn,
                setFocusedColumn
            ])}
        >
            <Atoms.Wrapper>
                <Atoms.Track ref={trackRef}>
                    {statuses.map((status, columnRenderOrder) => (
                        <Column
                            renderOrder={columnRenderOrder}
                            status={status}
                            key={status.id.__identifier}
                        >
                            {tasks.map((task) => {
                                if (task.status?.__identifier === status.id.__identifier) {
                                    return (
                                        <StatusColumnStylesheet.ColumnCard
                                            key={task.id.__identifier}
                                        >
                                            <Card.Tile>
                                                <Card.CardLabel>
                                                    Created: {task.createdAt}
                                                </Card.CardLabel>
                                                <Card.CardTitle>
                                                    {task.name}
                                                </Card.CardTitle>
                                            </Card.Tile>
                                        </StatusColumnStylesheet.ColumnCard>
                                    )
                                }
                                return null;
                            })}
                        </Column>
                    ))}
                    <StatusColumnStylesheet.AddStatusWrapper 
                        translateX={getTranslateValue(statuses.length)}
                    >
                        <AddStatusForm />
                    </StatusColumnStylesheet.AddStatusWrapper>
                </Atoms.Track>
            </Atoms.Wrapper>

            <div>
                <div>Backlog: </div>
                {tasks.map(task => {
                    if (!task.status) {
                        return (
                            <StatusColumnStylesheet.ColumnCard key={task.id.__identifier}>
                                <Card.Tile>
                                    <Card.CardLabel>
                                        Created: {task.createdAt}
                                    </Card.CardLabel>
                                    <Card.CardTitle>
                                        {task.name}
                                    </Card.CardTitle>
                                </Card.Tile>
                            </StatusColumnStylesheet.ColumnCard>
                        )
                    }

                    return null;
                })}
            </div>
        </StatusColumnsContextProvider>
    )
}

export default StatusColumns;
