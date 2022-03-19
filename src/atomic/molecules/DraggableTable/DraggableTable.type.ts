import React, { MutableRefObject, ReactElement, ReactNode } from "react"

type TableItemComponent = (props: ListItemWrapperProps) => ReactElement<any, any> | null;

type ExposedData = {
    selector: string,
    pickedNode?: HTMLElement,
    droppedOnNode?: HTMLElement,
}

type ListItem = {
    selector: string,
    dropZoneMode?: boolean,
    childListItems?: ListItem[],
    childListOnPick?: (params: ExposedData) => void;
    childListOnDrop?: (params: ExposedData) => void;
    childListOnFocus?: (params: ExposedData) => void;
    childListOnBlur?: (params: ExposedData) => void;
    childListDisableTransverseDragging?: boolean;
    ChildListItemComponent?: TableItemComponent,
    childListHorizontal?: boolean,
    childListItemSpace?: number,
    childListGapSpace?: number,
}

type ListItemWrapperProps = {
    selector: string,
    childListItems?: ListItem[],
    onPick?: (params: ExposedData) => void;
    onDrop?: (params: ExposedData) => void;
    onFocus?: (params: ExposedData) => void;
    onBlur?: (params: ExposedData) => void;
    disableTransverseDragging?: boolean;
    horizontal?: boolean,
    itemSpace?: number,
    gapSpace?: number,
}

export type {
    ListItem,
    ListItemWrapperProps
}