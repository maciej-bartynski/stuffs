import { ZERO } from "consts/mathVariables";

const DEFAULT_ITEM_SPACE = 200;
const DEFAULT_GAP_SPACE = 20;

const translateBy = (id: number, itemSpace: number, gapSpace: number): number => (itemSpace * id) + (id ? gapSpace * id : ZERO);

export {
    translateBy,
    DEFAULT_ITEM_SPACE,
    DEFAULT_GAP_SPACE
}