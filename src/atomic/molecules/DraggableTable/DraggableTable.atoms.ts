import styled from "styled-components";

const List = styled.ul<{
    minListHeight?: number,
    horizontal?: boolean,
    listPaddingBottom?: number
}>`
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
`;

const Placeholder = styled.div<{
    itemSpace: number,
    horizontal: boolean,
}>`
    height: ${(props): string => {
        if (props.horizontal) return '100%';
        return `${props.itemSpace}px`
    }};

    width: ${(props): string => {
        if (!props.horizontal) return '100%';
        return `${props.itemSpace}px`
    }};
`;


const ListItemContainer = styled.li<{
    itemSpace: number,
    horizontal: boolean,
    moveBy?: number,
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

const DraggableTableAtoms = {
    List,
    ListItemContainer,
    Placeholder
}

export default DraggableTableAtoms

export type DraggableTableAtomsType = typeof DraggableTableAtoms;