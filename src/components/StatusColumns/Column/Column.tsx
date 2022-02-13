import ColumnStylesheet, { ColumnStylesheetType } from "./Column.stylesheet";
import AddTaskForm from "components/AddTaskForm";
import { StatusType } from "models/Status/Status.types";
import { useStatusColumnsContext } from "../StatusColumns.context";
import { MouseEventHandler, useCallback, useEffect, useRef, useState } from "react";
import { getTranslateValue } from "../lib";
import { useDragItem, useDropItem, useMouseMove, useTranslateColumnToArrayPosition } from "./lib";
import ColumnHandle from "./ColumnHandle";

type ColumnProps = {
    Atoms?: ColumnStylesheetType,
    status: StatusType,
    renderOrder: number;
}
const Column: React.FC<ColumnProps> = ({
    Atoms = ColumnStylesheet,
    status,
    children,
    renderOrder
}) => {
    const [lockedRenderOrder, lockRenderOrder] = useState<number | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const {
        removeStatus,
        lockedColumn, pickColumn, dropColumn, moveOverDropZone,
        dropZone, setDropZone,
        focusedColumn, setFocusedColumn
    } = useStatusColumnsContext();
    const locked = lockedColumn?.__identifier === status.id.__identifier;
    const over = dropZone?.__identifier === status.id.__identifier && !locked;
    const [coords, setCoords] = useState({ x: 0, y: 0 });

    const onMouseDown: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
        const { clientX, clientY } = e;
        setCoords({ x: clientX, y: clientY })
        pickColumn(status.id);
        lockRenderOrder(renderOrder);
    }, [pickColumn, status.id, renderOrder]);

    useDropItem(wrapperRef, locked, dropColumn,renderOrder, setCoords, lockRenderOrder)
    useDragItem(wrapperRef, locked, coords, lockedRenderOrder);
    useMouseMove(wrapperRef, locked, setDropZone, moveOverDropZone, lockedColumn, over, status.id);
    useTranslateColumnToArrayPosition(wrapperRef, renderOrder, locked);

    useEffect(() => {
        if (locked && wrapperRef.current) wrapperRef.current.style.transition = 'none';
        else if (!locked && wrapperRef.current) wrapperRef.current.style.transition = 'transform 150ms linear';
    }, [locked])
    return (
        <Atoms.StatusColumnWrapper
            over={over}
            picked={locked}
            focused={focusedColumn?.__identifier === status.id.__identifier}
            ref={wrapperRef}
            translateX={getTranslateValue(renderOrder)}
        >
            <ColumnHandle
                currentStatus={status.id}
                onMouseDown={onMouseDown}
                setFocusedColumn={setFocusedColumn}
            />
            <Atoms.ColumnHead>
                <Atoms.ColumnTitle>
                    [{status.order}] - {status.name}
                </Atoms.ColumnTitle>
                <Atoms.ColumnDelete
                    onClick={(): void => removeStatus(status.id)}
                >
                    Remove
                </Atoms.ColumnDelete>
            </Atoms.ColumnHead>
            <ColumnStylesheet.ColumnCardList>
                {children}
            </ColumnStylesheet.ColumnCardList>
            <AddTaskForm status={status.id} />
        </Atoms.StatusColumnWrapper>
    )
}

export default Column;
