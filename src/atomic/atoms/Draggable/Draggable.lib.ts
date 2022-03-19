import { ANIMATION_FRAME_DURATION, TRANSITION_STYLE_BASE, TRANSITION_TIME_BASE } from "consts/variables";
import { RefObject, useEffect } from "react";
import { DraggableProps, ItemCoords, MouseCoords } from "./Draggable.types";

interface UseOnMouseUp {
    (params: {
        onDrop: DraggableProps['onDrop'],
        setMouseCoords: (arg: MouseCoords | null) => void,
        mouseCoords: MouseCoords | null,
        selector: string,
        setItemCoords: (itemCoords: ItemCoords | null) => void;
        draggable: RefObject<HTMLDivElement | null>;
        positioner: RefObject<HTMLDivElement | null>;
    }): void;
}
const useOnMouseUp: UseOnMouseUp = ({
    onDrop = (): void => { },
    setMouseCoords,
    mouseCoords,
    selector,
    setItemCoords,
    draggable,
    positioner,
}) => {
    useEffect(() => {
        function onMouseUp(e: MouseEvent): void {
            setMouseCoords(null);
            if (draggable.current && positioner.current) {
                const { x: targetX, y: targetY } = positioner.current.getBoundingClientRect();
                draggable.current.style.transition = `top ${TRANSITION_STYLE_BASE}, left ${TRANSITION_STYLE_BASE}`;

                setTimeout(() => {
                    if (draggable.current) {
                        draggable.current.style.top = `${targetY}px`;
                        draggable.current.style.left = `${targetX}px`;
                        setTimeout(() => {
                            if (draggable.current) {
                                draggable.current.style.removeProperty('transition');
                                draggable.current.style.removeProperty('top');
                                draggable.current.style.removeProperty('left');
                                draggable.current.style.removeProperty('position');
                                setItemCoords(null);
                            }
                        }, TRANSITION_TIME_BASE)
                    }
                }, ANIMATION_FRAME_DURATION)

                onDrop({
                    selector,
                    node: draggable.current
                });
            }
        }
        if (mouseCoords) window.addEventListener('mouseup', onMouseUp);
        return (): void => {
            window.removeEventListener('mouseup', onMouseUp);
        }
    }, [
        onDrop,
        setMouseCoords,
        mouseCoords,
        selector,
        setItemCoords,
        draggable,
        positioner
    ])
}

interface UseOnMouseMove {
    (params: {
        draggable: RefObject<HTMLDivElement | null>;
        onDrag: DraggableProps['onDrag'];
        disableX: boolean,
        disableY: boolean,
        selector: string,
        coords: {
            mouseCoords: MouseCoords | null,
            itemCoords: ItemCoords | null
        } | null,
    }): void;
}
const useOnMouseMove: UseOnMouseMove = ({
    draggable,
    onDrag = (): void => { },
    disableX,
    disableY,
    selector,
    coords,
}) => {
    const { itemCoords, mouseCoords } = coords || {};
    useEffect(() => {
        function onMouseMove(e: MouseEvent): void {
            const { clientX, clientY } = e;
            
            if (draggable.current && mouseCoords && itemCoords) {
                const disabledDiffValue = 0;
                const diffY = disableY ? disabledDiffValue : clientY - mouseCoords.clientY;
                const diffX = disableX ? disabledDiffValue : clientX - mouseCoords.clientX;
                draggable.current.style.left = `${itemCoords.defaultX + diffX}px`;
                draggable.current.style.top = `${itemCoords.defaultY + diffY}px`;
                onDrag({
                    selector,
                    node: draggable.current
                })
            }
        }
        if (mouseCoords) window.addEventListener('mousemove', onMouseMove);
        return (): void => {
            window.removeEventListener('mousemove', onMouseMove);
        }
    }, [onDrag, draggable, disableX, disableY, selector, itemCoords, mouseCoords])
}

export {
    useOnMouseUp,
    useOnMouseMove
}