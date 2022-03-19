import { NEGATIVE_ONE, ONE, ZERO } from "consts/mathVariables";
import { ANIMATION_FRAME_DURATION, SCROLLBAR_WIDTH_PX } from "consts/variables";
import { RefObject, useEffect, useRef } from "react";
import { DraggableListItem, OrderedDraggableListItem } from "./DraggableList.types";

const DEFAULT_ITEM_SPACE = 200;
const DEFAULT_GAP_SPACE = 20;

const translateBy = (id: number, itemSpace: number, gapSpace: number): number => (itemSpace * id) + (id ? gapSpace * id : ZERO);

interface UseAttachListHeightFromItemsHeight {
    (params: {
        listRef: RefObject<HTMLUListElement>,
        horizontal: boolean,
        items: DraggableListItem[],
        listPaddingBottom?: number,

        gapSpace: number
    }): void
}
const useAttachListHeightFromItemsHeight: UseAttachListHeightFromItemsHeight = ({
    horizontal,
    listRef,
    items,
    listPaddingBottom = 0,
    gapSpace,
}) => {
    useEffect(() => {
        const { current: list } = listRef;
        if (list) {
   
            let listHeight = 0;

            if (!horizontal) {
                list.childNodes.forEach((node, idx, self) => {
                    const li = node as HTMLLIElement;
                    listHeight += li.offsetHeight + gapSpace;

                });

                setTimeout(() => {
                    listHeight += listPaddingBottom;
                    list.style.height = `${listHeight}px`
                }, ANIMATION_FRAME_DURATION)
            }
        }
    }, [horizontal, listRef, items, listPaddingBottom, gapSpace]);
}

interface UseMouseMoveDetectDropZone {
    (params: {
        helperListRef: RefObject<HTMLUListElement>,
        horizontal: boolean,
        setDropSelector: (selector: string) => void,
        pickedSelector: string | undefined,
        orderedItems: OrderedDraggableListItem[]
    }): void
}
const useMouseMoveDetectDropZone: UseMouseMoveDetectDropZone = ({
    horizontal,
    helperListRef,
    pickedSelector,
    setDropSelector,
    orderedItems
}) => {
    const timerRef = useRef<NodeJS.Timeout>()
    useEffect(() => {
        function onMouseMove(e: MouseEvent): void {

            function debounceTimer(callback: Function): void {
                if (timerRef.current) clearTimeout(timerRef.current);
                timerRef.current = window.setTimeout(callback, ANIMATION_FRAME_DURATION) as any;
            }

            const { clientX, clientY } = e;
            const { current: listElement } = helperListRef;
            if (listElement) {
                listElement.childNodes.forEach((node, order) => {
                    const li = node as HTMLLIElement;
                    const { top, bottom, left, right } = li.getBoundingClientRect();
                    const mouseOverHorizontal = left <= clientX && right >= clientX;
                    const mouseOverVertical = bottom >= clientY && top <= clientY;
                    const mouseOver = horizontal ? mouseOverHorizontal : mouseOverVertical;
                    if (mouseOver) {
                        const orderedItem = orderedItems.find((item) => item.order === order)!;
                        debounceTimer(() => { setDropSelector(orderedItem.item.selector) })
                    }
                })
            }
        };
        if (pickedSelector) window.addEventListener('mousemove', onMouseMove);
        return (): void => {
            window.removeEventListener('mousemove', onMouseMove);
            if (timerRef.current) clearTimeout(timerRef.current);
        }
    }, [pickedSelector, horizontal, setDropSelector, helperListRef, orderedItems]);
}

interface UseMoveItemByKeyboard {
    (params: {
        focusedSelector?: DraggableListItem['selector'],
        orderedItems: OrderedDraggableListItem[],
        setDropSelector: (selector?: DraggableListItem['selector']) => void,
        horizontal: boolean
    }): void
}
const useMoveItemByKeyboard: UseMoveItemByKeyboard = ({
    focusedSelector,
    orderedItems,
    setDropSelector,
    horizontal
}) => {
    useEffect(() => {
        function keyboardHandler(e: KeyboardEvent): void {
            const horizontalArrowPressed = (e.key === 'ArrowLeft' || e.key === 'ArrowRight');
            const verticalArrowPressed = (e.key === 'ArrowUp' || e.key === 'ArrowDown');
            const arrowPressed = (horizontal && horizontalArrowPressed) || (!horizontal && verticalArrowPressed)
            if (focusedSelector && arrowPressed) {
                const dropSelector = orderedItems.reduce((result, item, idx, self) => {
                    const arrowIncrement = (horizontal && e.key === 'ArrowRight') || (!horizontal && e.key === 'ArrowDown')
                    const moveUnit = arrowIncrement ? ONE : NEGATIVE_ONE;
                    if (item.item.selector === focusedSelector) {
                        const drop = self[idx + moveUnit];
                        return drop?.item.selector
                    }

                    return result;
                }, focusedSelector)
                setDropSelector(dropSelector)
            }
        }

        if (focusedSelector) window.addEventListener('keydown', keyboardHandler);

        return (): void => {
            window.removeEventListener('keydown', keyboardHandler);
        }
    }, [focusedSelector, orderedItems, setDropSelector, horizontal])
}

export {
    DEFAULT_GAP_SPACE,
    DEFAULT_ITEM_SPACE,
    translateBy,
    useAttachListHeightFromItemsHeight,
    useMouseMoveDetectDropZone,
    useMoveItemByKeyboard
}