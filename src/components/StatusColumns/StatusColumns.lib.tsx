const COLUMN_WIDTH_PX = 250;
const TILE_HEIGHT_PX = 150;
const GAP_SPACE = 10;
const VIEW_HEIGHT = 800;
const VIEW_PADDING_TOP = 20;
const VIEW_PADDING_BOTTOM = 20;
const VIEW_PADDING_SUM = VIEW_PADDING_BOTTOM + VIEW_PADDING_TOP;

const FORM_ITEM_SELECTOR = 'unique key form add status form';

const getTranslateValue = (order: number): number => {
    const columnWidth = COLUMN_WIDTH_PX + GAP_SPACE;
    const columnTranslatePosition = order * columnWidth;
    return columnTranslatePosition
}

export {
    COLUMN_WIDTH_PX,
    GAP_SPACE,
    TILE_HEIGHT_PX,
    FORM_ITEM_SELECTOR,
    VIEW_HEIGHT,
    VIEW_PADDING_TOP,
    VIEW_PADDING_BOTTOM,
    VIEW_PADDING_SUM,
    getTranslateValue
}