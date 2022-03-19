import { HTMLAttributes } from "react"
import { DraggableStylesType } from "./Draggable.style"

type MouseCoords = {
    clientX: number,
    clientY: number,
}

type ItemCoords = {
    defaultX: number,
    defaultY: number,
}

type DraggableProps = {
    selector: string,
    defaultX?: number,
    defaultY?: number,
    className?: string,
    onPick?: (params: {
        selector: string,
        node: HTMLElement | null,
    }) => void;
    onDrag?: (params: {
        selector: string,
        node: HTMLElement | null,
    }) => void;
    onDrop?: (params: {
        selector: string,
        node: HTMLElement | null,
    }) => void;
    Atoms?: DraggableStylesType,
    disableY?: boolean,
    disableX?: boolean,
    renderAs?: 'div' | 'li',
    onFocus?: (params: {
        selector: string,
    }) => void,
    onBlur?: (params: {
        selector: string,
    }) => void,
} & HTMLAttributes<HTMLDivElement>

export type {
    MouseCoords,
    ItemCoords,
    DraggableProps
}