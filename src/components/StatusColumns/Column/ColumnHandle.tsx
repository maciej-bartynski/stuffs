import { MouseEventHandler, useCallback } from "react";
import ColumnStylesheet, { ColumnStylesheetType } from "./Column.stylesheet";
import useStatusesStore from 'store/statusesStore/useStatusesStore';
import { StatusUuid } from "models/Status/Status.types";
import { swipeStatuses } from "../lib";

type ColumnHandleProps = {
    Atoms?: ColumnStylesheetType,
    onMouseDown: MouseEventHandler<HTMLButtonElement>,
    currentStatus: StatusUuid,
    setFocusedColumn: (statusUuid: StatusUuid | null) => void;
}

const ColumnHandle: React.FC<ColumnHandleProps> = ({
    Atoms = ColumnStylesheet,
    onMouseDown,
    currentStatus,
    setFocusedColumn
}) => {
    const { setAllStatuses, statuses } = useStatusesStore();

    const onKeyPress: React.KeyboardEventHandler<HTMLButtonElement> = useCallback((e) => {
        const { key } = e;
        const moveLeft = -1;
        const moveRight = 1;
        const noMove = 0;
        const moveBy = (key === 'ArrowLeft' && moveLeft)
            || (key === 'ArrowRight' && moveRight)
            || noMove;
        
        const dropZone = statuses.find((_, idx, all) => {
            const curr = all[idx - moveBy];
            const currId = curr?.id.__identifier;
            return currId === currentStatus.__identifier;
        });
     
        if (dropZone) {
            const swipedStatuses = swipeStatuses(currentStatus, dropZone?.id, statuses);
            setAllStatuses(swipedStatuses);
        }
    }, [statuses, currentStatus, setAllStatuses]);

    return (
        <Atoms.Handle
            onMouseDown={onMouseDown}
            onKeyDown={onKeyPress}
            onFocus={():void => setFocusedColumn(currentStatus)}
            onBlur={():void => setFocusedColumn(null)}
        />
    )
}

export default ColumnHandle;