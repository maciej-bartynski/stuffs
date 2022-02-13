import { StatusUuid } from "models/Status/Status.types";
import { RefObject, useEffect } from "react";
import { getTranslateValue } from "../lib";

interface UseTranslateColumnToArrayPosition {
    (wrapperRef: RefObject<HTMLDivElement>,
        renderOrder: number,
        locked: boolean): void
};

const useTranslateColumnToArrayPosition: UseTranslateColumnToArrayPosition = (wrapperRef, renderOrder, locked) => {
    useEffect(() => {
        if (!locked) {
            const { current: column } = wrapperRef;
            if (column) {
                column.style.transform = `translateX(${getTranslateValue(renderOrder)}px)`;
            }
        }
    }, [wrapperRef, locked, renderOrder])
}

interface UseMouseMove {
    (wrapperRef: RefObject<HTMLDivElement>,
        locked: boolean,
        setDropZone: (id: StatusUuid | null) => void,
        moveOverDropZone: (id: StatusUuid) => void,
        lockedColumn: StatusUuid | null,
        over: boolean,
        statusId: StatusUuid): void
}

const useMouseMove: UseMouseMove = (wrapperRef, locked, setDropZone, moveOverDropZone, lockedColumn, over, statusId) => {
    useEffect(() => {
        const onMouseMove = (e: MouseEvent): void => {
            const { clientX } = e;
            const { current: column } = wrapperRef;
            if (!locked && column && lockedColumn) {
                const { left, right } = column.getBoundingClientRect();
                const mouseOver = clientX <= right && clientX >= left;
                if (mouseOver) {
                    moveOverDropZone(statusId);
                }
                else {
                    if (over) setDropZone(null)
                }
            }
        }

        if (!locked) {
            window.addEventListener('mousemove', onMouseMove);
        }
        return (): void => {
            window.removeEventListener('mousemove', onMouseMove);
        }
    }, [wrapperRef, locked, setDropZone, moveOverDropZone, statusId, lockedColumn, over]);
}

interface UseDragItem {
    (wrapperRef: RefObject<HTMLDivElement>, locked: boolean, coords: { x: number, y: number }, lockedRenderOrder: number | null): void
}
const useDragItem: UseDragItem = (wrapperRef, locked, coords, lockedRenderOrder) => {
    useEffect(() => {
        const onMouseMove = (e: MouseEvent): void => {
            const { clientX } = e;
            const { current: column } = wrapperRef;
            if (locked && column && typeof lockedRenderOrder === 'number') {
                const initialTranslate = getTranslateValue(lockedRenderOrder)
                const diffX = clientX - coords.x;
                column.style.transform = `translateX(${initialTranslate + diffX}px)`;
            }
        }

        if (locked) {
            window.addEventListener('mousemove', onMouseMove);
        }
        return (): void => {
            window.removeEventListener('mousemove', onMouseMove);
        }
    }, [wrapperRef, locked, coords, lockedRenderOrder]);
}

interface UseDropItem {
    (wrapperRef: RefObject<HTMLDivElement>,
        locked: boolean,
        dropColumn: () => void,
        renderOrder: number,
        setCoords: (arg: { x: number, y: number }) => void,
        lockRenderOrder: (arg: number | null) => void
    ): void
}
const useDropItem: UseDropItem = (wrapperRef, locked, dropColumn, renderOrder, setCoords, lockRenderOrder) => {
    useEffect(() => {
        const onMouseUp = (e: MouseEvent) => {
            if (locked) {
                setCoords({ x: 0, y: 0 })
                const { current: column } = wrapperRef;
                if (column) {
                    lockRenderOrder(null);
                }
                dropColumn();
            }
        };
        if (locked) {
            window.addEventListener('mouseup', onMouseUp);
        }
        return () => {
            window.removeEventListener('mouseup', onMouseUp);
        }

    }, [wrapperRef, lockRenderOrder, setCoords, locked, dropColumn, renderOrder])
}

export {
    useTranslateColumnToArrayPosition,
    useMouseMove,
    useDragItem,
    useDropItem
}