import { StatusType, StatusUuid } from "models/Status/Status.types";
import { useRef, useEffect } from "react";
import useTasksStore from "store/tasksStore/useTasksStore";

const COLUMN_WIDTH_PX = 250;
const RIGHT_MARGIN_PX = 10;

const getTranslateValue = (order: number): number => {
    const columnWidth = COLUMN_WIDTH_PX + RIGHT_MARGIN_PX;
    const columnTranslatePosition = order * columnWidth;
    return columnTranslatePosition
}

interface UseCalculateTrackHeight {
    (): React.RefObject<HTMLDivElement>;
}
const useCalculateTrackHeight: UseCalculateTrackHeight = () => {
    const data = useTasksStore();
    const trackRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const { current: track } = trackRef;
        if (track) {
            let trackHeight = 0;
            track.childNodes.forEach(node => {
                const divNode = node as HTMLDivElement;
                trackHeight = divNode.offsetHeight > trackHeight
                    ? divNode.offsetHeight
                    : trackHeight;
            });
            track.style.minHeight = `${trackHeight}px`;
        }
    }, [data]);
    return trackRef;
}

interface SwipeStatuses {
    (dropped: StatusUuid, zone: StatusUuid, statuses: StatusType[]): StatusType[]
}
const swipeStatuses: SwipeStatuses = (dropped, zone, statuses) => {
    let moveStartIdx: number;
    let moveEndIdx: number;

    const droppedStatus = statuses.find(item => item.id.__identifier === dropped.__identifier);
    const zoneStatus = statuses.find(item => item.id.__identifier === zone.__identifier);

    const shuffledStatuses = statuses
        .sort((a, b) => a.order - b.order)
        .map((status, idx) => {
            const { id } = status;
            const isDropped = id.__identifier === dropped.__identifier;
            const isZone = id.__identifier === zone.__identifier;
            const isEdgeChangeRange = isDropped || isZone;

            if (isEdgeChangeRange && typeof moveStartIdx === 'number') moveEndIdx = idx;
            if (isEdgeChangeRange && typeof moveStartIdx !== 'number') {
                const decrementToLastIdx = 1;
                moveStartIdx = idx
                moveEndIdx = statuses.length - decrementToLastIdx
            };

            const isChangeRange = (idx >= moveStartIdx) && (idx <= moveEndIdx);
            if (isChangeRange) {
                const incrementOrder = 1;
                const decrementOrder = -1;
                const changeOrderBy = droppedStatus!.order > zoneStatus!.order
                    ? incrementOrder
                    : decrementOrder

                if (isDropped) return {
                    ...status,
                    order: zoneStatus!.order
                }
                else {
                    return {
                        ...status,
                        order: status.order + changeOrderBy
                    }
                }


            }
            return status
        })
        .sort((a, b) => a.order - b.order);

    return shuffledStatuses;
}

export {
    COLUMN_WIDTH_PX,
    RIGHT_MARGIN_PX,
    getTranslateValue,
    useCalculateTrackHeight,
    swipeStatuses
}