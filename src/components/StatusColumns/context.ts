import { createContext, useContext } from "react";

type StatusColumnContextType = {
    pickedTask?: string,
    pickedStatus?: string,
    blockOperations: boolean,
    setBlockOperations: (arg: boolean) => void;

    mouseOverStatus?: string,
    setMouseOverStatus: (mouseOverStatus?: string) => void,

    onStatusOrderChange: () => void,
};

const initialContext: StatusColumnContextType = {
    blockOperations: false,
    setBlockOperations: () => { },
    mouseOverStatus: undefined,
    setMouseOverStatus: () => {},
    onStatusOrderChange: () => {},
}

const StatusColumnContext = createContext<StatusColumnContextType>(initialContext);
const StatusColumnContextProvider = StatusColumnContext.Provider;
const useStatusColumnsContext = () => useContext(StatusColumnContext);

const context = {
    StatusColumnContextProvider,
    useStatusColumnsContext
}

export default context;
export type {
    StatusColumnContextType
}
