import Draggable from "atomic/atoms/Draggable";
import { ANIMATION_FRAME_DURATION, TRANSITION_STYLE_BASE } from "consts/variables";
import useEffectSingleDependency from "hooks/toolHooks/useEffectSingleDependency";
import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import DraggableTableAtoms, { DraggableTableAtomsType } from "./DraggableTable.atoms";
import { DEFAULT_GAP_SPACE, DEFAULT_ITEM_SPACE, translateBy } from "./DraggableTable.lib";
import { ListItem } from "./DraggableTable.type"

const DraggableTable: React.FC<ListItem & { Atoms?: DraggableTableAtomsType }> = ({
    selector,
    ChildListItemComponent,
    childListItems,
    dropZoneMode = false,
    childListHorizontal = true,
    childListItemSpace = DEFAULT_ITEM_SPACE,
    childListGapSpace = DEFAULT_GAP_SPACE,
    childListOnPick = (): void => { },
    childListOnDrop = (): void => { },
    childListOnFocus = (): void => { },
    childListOnBlur = (): void => { },
    childListDisableTransverseDragging = true,
    Atoms = DraggableTableAtoms
}) => {

    const [dropZoneIdx, setDropZoneIdx] = useState<number | null>(null);

    const listRef = useRef<HTMLUListElement>(null);

    const disableX = !childListHorizontal && !!childListDisableTransverseDragging;
    const disableY = childListHorizontal && !!childListDisableTransverseDragging;

    const Wrapper = ChildListItemComponent || Fragment;

    const listItems = useMemo(() => {
        const placeholder = {
            selector: "placeholder",
            dropZoneMode: false,
            childListItems: undefined,
        }
        if (dropZoneIdx === null) return childListItems;
        else if (childListItems) {
            const head = [...childListItems].slice(0, dropZoneIdx);
            const tail = [...childListItems].slice(dropZoneIdx);
            return [...head, placeholder, ...tail]
        }
    }, [childListItems, dropZoneIdx]);

    // const throttlingTimer = useRef<NodeJS.Timeout>()
    useEffect(() => {
        const handleDropZone = (e: MouseEvent) => {
            // throttlingTimer.current && clearTimeout(throttlingTimer.current);
            const { clientX, clientY } = e;
            const list = listRef.current;
            if (list) {
                const items = list.childNodes;
                items.forEach((n, idx) => {
                    const box = (n as HTMLLIElement).getBoundingClientRect();
                    const mouseOver = clientX <= box.right && clientX >= box.left &&
                        clientY <= box.bottom && clientY >= box.top;
                    if (mouseOver && !(n as HTMLLIElement).getAttribute('data-selector')) {
                        setDropZoneIdx(idx);
                    }
                })
            }
        }

        if (dropZoneMode) window.addEventListener("mousemove", handleDropZone);
        else {
            setDropZoneIdx(null);
        }

        return () => {
            window.removeEventListener("mousemove", handleDropZone);
        }
    }, [dropZoneMode])

    return (
        <Atoms.List
            horizontal={childListHorizontal}
            ref={listRef}
        >
            {listItems?.map((item, order) => {

                const elementToRender = item.selector === 'placeholder'
                    ? (
                        <Atoms.ListItemContainer
                            data-selector="placeholder"
                            key={item.selector || ""}
                            itemSpace={childListItemSpace}
                            horizontal={childListHorizontal}
                        />
                    )
                    : (
                        <Wrapper
                            selector={item.selector}
                            childListItems={item.childListItems}
                            onPick={childListOnPick}
                            onDrop={childListOnDrop}
                            onFocus={childListOnFocus}
                            onBlur={childListOnBlur}
                            disableTransverseDragging={childListDisableTransverseDragging}
                            horizontal={childListHorizontal}
                            itemSpace={childListItemSpace}
                            gapSpace={childListGapSpace}

                        >
                            <DraggableTable
                                {...item}
                            />
                        </Wrapper>
                    )

                return (
                    <Transitionable
                        itemSpace={childListItemSpace}
                        moveBy={translateBy(order, childListItemSpace, childListGapSpace)}
                        horizontal={childListHorizontal}
                        disableY={disableY}
                        disableX={disableX}
                        onPick={childListOnPick}
                        onDrop={childListOnDrop}
                        onFocus={childListOnFocus}
                        onBlur={childListOnBlur}
                        dropZoneMode={item.dropZoneMode || false}
                        selector={item.selector || ""}
                        Atoms={Atoms}
                        key={item.selector || ""}
                    >
                        {elementToRender}
                    </Transitionable>
                )

            })}
        </Atoms.List>
    )
}

export default DraggableTable;

const Transitionable: React.FC<{
    itemSpace: number,
    horizontal: boolean,
    moveBy: number,
    disableY: boolean,
    disableX: boolean,
    selector: string,
    onBlur: ({ selector }: any) => void,
    onFocus: ({ selector }: any) => void,
    onPick: ({ selector }: any) => void,
    onDrop: ({ selector }: any) => void,
    dropZoneMode: boolean,
    Atoms: DraggableTableAtomsType
}> = ({
    children,
    itemSpace,
    horizontal,
    moveBy,
    disableY,
    disableX,
    selector,
    onBlur,
    onFocus,
    onPick,
    onDrop,
    Atoms = DraggableTableAtoms
}) => {

        const wrapperRef = useRef<HTMLLIElement>(null);

        useEffect(() => {
            const { current: n } = wrapperRef;
            if (n) {
                n.style.transition = `top ${TRANSITION_STYLE_BASE}, left ${TRANSITION_STYLE_BASE}`;
                n.style.left = horizontal ? `${moveBy}px` : "0";
                n.style.top = horizontal ? "0" : `${moveBy}px`;
            }
        }, [moveBy, horizontal]);

        return (
            <Atoms.ListItemContainer
                ref={wrapperRef}
                itemSpace={itemSpace}
                horizontal={horizontal}
            >
                <Draggable
                    disableY={disableY}
                    disableX={disableX}
                    onPick={onPick}
                    onDrop={onDrop}
                    selector={selector}
                    onFocus={onFocus}
                    onBlur={onBlur}
                >
                    {children}
                </Draggable>
            </Atoms.ListItemContainer>
        )

    }