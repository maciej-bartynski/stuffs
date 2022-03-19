import Tile from './Card';
import CardLabel from './Label';
import CardTitle from './Title';

const CardStylesheet = {
    Tile,
    CardLabel,
    CardTitle
}

type CardStylesheetType = {
    Tile: typeof Tile,
    CardLabel: typeof CardLabel,
    CardTitle: typeof CardTitle
}

export default CardStylesheet;

export type {
    CardStylesheetType
}