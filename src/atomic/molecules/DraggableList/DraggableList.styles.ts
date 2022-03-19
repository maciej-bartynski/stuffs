import { TRANSITION_STYLE_BASE } from "consts/variables";
import styled from "styled-components";

const HelperList = styled.ul<{
    horizontal?: boolean,
}>`
    position: relative;
    pointer-events: none;
    list-style: none;
    margin: 0;
    padding: 0;
    box-sizing: border-box;

`;

const List = styled.ul<{
    minListHeight?: number,
    horizontal?: boolean,
    listPaddingBottom?: number
}>`
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
    margin-top: 20px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
`;

const View = styled.div<{
    horizontal: boolean,
    viewHeight?: number;
    viewPaddingBottom?: number;
    viewPaddingTop?: number;
}>`
    display: flex;
    flex-direction: ${(props): string => props.horizontal ? "column" : "row"};
    width: 100%;
    height: ${(props): string => {
        return props.viewHeight ? `${props.viewHeight}px` : "100%"
    }};
`

const ListItemContainer = styled.li<{
    itemSpace: number,
    horizontal: boolean,
    moveBy?: number,
    xxx?: true,
}>`

    display: block;
    padding: 0;
    margin: 0;
    list-style: none;
    position: absolute;

    height: ${(props): string => {
        if (props.horizontal) return '100%';
        return `${props.itemSpace}px`
    }};

    width: ${(props): string => {
        if (!props.horizontal) return '100%';
        return `${props.itemSpace}px`
    }};

    ${(props): string => {
        if (props.moveBy) {
            return `
                left: ${props.horizontal ? `${props.moveBy}px` : "0"};
                top: ${props.horizontal ? "0" : `${props.moveBy}px`};
            `
        }

        return ""
    }}
`;

const DraggableListAtoms = {
    List,
    HelperList,
    View,
    ListItemContainer
}

const stylesheet = {
    DraggableListAtoms
}

export default stylesheet

export type DraggableListStylesType = typeof DraggableListAtoms;