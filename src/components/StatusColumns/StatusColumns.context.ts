import { StatusType, StatusUuid } from "models/Status/Status.types";
import { createContext, useContext } from "react";

type StatusColumnsContextType = {
    statuses: StatusType[],
    removeStatus: (statusUuid: StatusUuid) => void,

    lockedColumn: null | StatusUuid,
    pickColumn: (lockedColumn: StatusUuid) => void;
    dropColumn: () => void;
    shuffleColumns: (statusId: null | StatusUuid) => void;

    dropZone: null | StatusUuid,
    setDropZone: (lockedColumn: null | StatusUuid) => void;
    moveOverDropZone: (statusUuid: StatusUuid) => void;

    focusedColumn: StatusUuid | null;
    setFocusedColumn: (statusUuid: StatusUuid | null) => void;
}

const statusColumnsInitialValue: StatusColumnsContextType = {
    statuses: [],
    removeStatus: () => { },

    lockedColumn: null,
    pickColumn: () => { },
    dropColumn: () => { },
    shuffleColumns: () => { },

    dropZone: null,
    setDropZone: () => { },
    moveOverDropZone: () => { },

    focusedColumn: null,
    setFocusedColumn: () => { },
}

const StatusColumnsContext = createContext(statusColumnsInitialValue);
const StatusColumnsContextProvider = StatusColumnsContext.Provider;
const useStatusColumnsContext = (): StatusColumnsContextType => useContext<StatusColumnsContextType>(StatusColumnsContext);

export {
    useStatusColumnsContext,
    StatusColumnsContextProvider
}
