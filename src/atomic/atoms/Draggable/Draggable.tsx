import { ZERO } from "consts/mathVariables";
import React, { forwardRef, RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useOnMouseMove, useOnMouseUp } from "./Draggable.lib";
import DraggableStyles from "./Draggable.style";
import { DraggableProps, ItemCoords, MouseCoords } from "./Draggable.types";

const Draggable = forwardRef<HTMLDivElement, DraggableProps>(({
    children,
    className,
    onPick = (): void => { },
    onDrag = (): void => { },
    onDrop = (): void => { },
    Atoms = DraggableStyles,
    defaultX = ZERO,
    defaultY = ZERO,
    disableX = false,
    disableY = false,
    selector,
    renderAs = 'div',
    onFocus = (): void => { },
    onBlur = (): void => { },
    ...htmlAttributes
}, passedRef) => {

    const [coords, setCoords] = useState<{
        mouseCoords: MouseCoords | null,
        itemCoords: ItemCoords | null,
    } | null>(null);

    const setMouseCoords = useCallback((mouseCoords: MouseCoords | null) => {
        setCoords(coords => ({
            itemCoords: coords?.itemCoords || null,
            mouseCoords,
        }))
    }, [setCoords]);

    const setItemCoords = useCallback((itemCoords: ItemCoords | null) => {
        setCoords(coords => ({
            mouseCoords: coords?.mouseCoords || null,
            itemCoords,
        }))
    }, [setCoords]);

    const _draggableRef = useRef<HTMLDivElement>(null);
    const draggableRef = (passedRef || _draggableRef) as RefObject<HTMLDivElement>;
    const positionerRef = useRef<HTMLDivElement>(null);

    const onMouseDown: React.MouseEventHandler<HTMLElement> = useCallback((e) => {
        e.stopPropagation();
        const { clientX, clientY } = e;
        if (positionerRef.current) {
            const { x, y } = positionerRef.current.getBoundingClientRect();
            setCoords({
                mouseCoords: { clientX, clientY },
                itemCoords: { defaultX: x, defaultY: y }
            })
            onPick({
                node: draggableRef.current,
                selector
            })
        }
    }, [
        setCoords,
        onPick,
        selector,
        draggableRef
    ]);

    useOnMouseMove({
        onDrag,
        draggable: draggableRef,
        disableX,
        disableY,
        selector,
        coords
    })

    useOnMouseUp({
        setMouseCoords,
        onDrop,
        mouseCoords: coords?.mouseCoords || null,
        selector,
        setItemCoords,
        draggable: draggableRef,
        positioner: positionerRef,
    })

    return (
        <>
            <Atoms.Positioner
                data-selector="draggable-positioner"
                ref={positionerRef}
            />
            <Atoms.Wrapper
                data-selector="draggable"
                ref={draggableRef}
                as={renderAs}
                picked={!!coords?.itemCoords}
                x={coords?.itemCoords?.defaultX}
                y={coords?.itemCoords?.defaultY}
                {...htmlAttributes}

                onMouseDown={onMouseDown}
                onFocus={(): void => onFocus({ selector })}
                onBlur={(): void => onBlur({ selector })}
            >
                {children}
            </Atoms.Wrapper>
        </>
    )
})

export default Draggable;