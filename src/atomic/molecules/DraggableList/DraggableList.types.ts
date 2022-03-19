import { DraggableStylesType } from "atomic/atoms/Draggable/Draggable.style";
import { ReactNode } from "react";
import { DraggableListStylesType } from "./DraggableList.styles";

type OrderedDraggableListItem = {
    order: number,
    item: DraggableListItem
}

type DraggableListItem = {
    selector: string,
    content: ReactNode,
}

type DraggableListProps = {
    items: DraggableListItem[];
    horizontal?: boolean;
    itemSpace?: number;
    gapSpace?: number;
    Atoms?: DraggableListStylesType;
    minListHeight?: number;
    listPaddingBottom?: number;
    onChange?: (params: {
        pickedSelector?: string,
        dropSelector?: string,
    }) => void;
    onPick?: (selector?: string) => void;
    onDrop?: (selector?: string) => void;
    disableX?: boolean;
    disableY?: boolean;
};


export type {
    DraggableListProps,
    DraggableListItem,
    OrderedDraggableListItem
}