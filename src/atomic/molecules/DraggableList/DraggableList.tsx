import Draggable from "atomic/atoms/Draggable";
import { TRANSITION_STYLE_BASE } from "consts/variables";
import useEffectSingleDependency from "hooks/toolHooks/useEffectSingleDependency";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DEFAULT_GAP_SPACE, DEFAULT_ITEM_SPACE, translateBy, useAttachListHeightFromItemsHeight, useMouseMoveDetectDropZone, useMoveItemByKeyboard } from "./DraggableList.lib";
import stylesheet from "./DraggableList.styles";
import { DraggableListProps } from "./DraggableList.types";

const DraggableList: React.FC<DraggableListProps> = ({
    items,
    horizontal = true,
    Atoms = stylesheet.DraggableListAtoms,
    itemSpace = DEFAULT_ITEM_SPACE,
    gapSpace = DEFAULT_GAP_SPACE,
    onChange = (): void => { },
    onPick = (): void => { },
    onDrop = (): void => { },
    minListHeight,
    listPaddingBottom,
    disableX,
    disableY,
}) => {
    const [focusedSelector, setFocusedSelector] = useState<string>();
    const [pickedSelector, setPickedSelector] = useState<string>();
    const [dropSelector, setDropSelector] = useState<string>();

    const listRef = useRef<HTMLUListElement>(null);
    const helperListRef = useRef<HTMLUListElement>(null);

    const orderedItems = useMemo(() => items.map((item, idx) => ({
        item,
        order: idx,
    })), [items])

    useEffectSingleDependency(() => {
        if ((pickedSelector || focusedSelector) && dropSelector) {
            onChange({
                pickedSelector: pickedSelector || focusedSelector,
                dropSelector
            });
            setDropSelector(undefined)
        }
    }, `${pickedSelector}${dropSelector}${focusedSelector}`)

    useAttachListHeightFromItemsHeight({
        listRef,
        horizontal,
        items,
        listPaddingBottom,
        gapSpace
    })

    useMouseMoveDetectDropZone({
        helperListRef,
        horizontal,
        setDropSelector,
        pickedSelector: pickedSelector,
        orderedItems
    })

    const onPickHandler = useCallback(({ selector }) => {
        setPickedSelector(selector);
        onPick(selector)
    }, [setPickedSelector, onPick]);

    const onDropHandler = useCallback(({ selector }) => {
        setPickedSelector(undefined);
        onDrop(selector);
    }, [setPickedSelector, onDrop]);

    const onFocus = useCallback(({ selector }) => {
        setFocusedSelector(selector);
    }, [setFocusedSelector]);

    const onBlur = useCallback(() => {
        setFocusedSelector(undefined);
    }, [setFocusedSelector])

    useMoveItemByKeyboard({
        focusedSelector,
        setDropSelector,
        orderedItems,
        horizontal
    })

    const _disableY = typeof disableY === 'boolean' ? disableY : (horizontal ? true : false);
    const _disableX = typeof disableX === 'boolean' ? disableX : (horizontal ? false : true);

    return (
        <Atoms.View
            id="view"
            horizontal
        >
            <Atoms.HelperList ref={helperListRef}>
                {orderedItems.map((_, idx) => {
                    return (
                        <Atoms.ListItemContainer
                            itemSpace={itemSpace}
                            key={idx}
                            moveBy={translateBy(idx, itemSpace, gapSpace)}
                            horizontal={horizontal}
                            xxx={true}
                        />
                    )
                })}
            </Atoms.HelperList>
            <Atoms.List
                horizontal={horizontal}
                ref={listRef}
                minListHeight={minListHeight}
                listPaddingBottom={listPaddingBottom}
            >
                {orderedItems.map(({ item, order }) => {
                    return (
                        <Transitionable
                            itemSpace={itemSpace}
                            horizontal={horizontal}
                            selector={item.selector}
                            moveBy={translateBy(order, itemSpace, gapSpace)}
                            disableY={_disableY}
                            disableX={_disableX}
                            onPick={onPickHandler}
                            onDrop={onDropHandler}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            Atoms={Atoms}
                            key={item.selector}
                        >
                            {item.content}
                        </Transitionable>
                    )
                    
                })}
            </Atoms.List>
        </Atoms.View>
    )
}

export default DraggableList;

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
    Atoms: DraggableListProps['Atoms']
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
    Atoms = stylesheet.DraggableListAtoms
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