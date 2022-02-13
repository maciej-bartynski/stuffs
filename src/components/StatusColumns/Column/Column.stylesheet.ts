import styled, { StyledComponent } from 'styled-components';
import { COLUMN_WIDTH_PX } from '../lib';

const activeColumnZIndex = 10;
const columnZIndex = 0;
const StatusColumnWrapper = styled.div<{
    over: boolean;
    translateX: number;
    picked: boolean;
    focused: boolean;
}>`
    border-radius: ${(props): number => props.theme.radius.base}px;
    padding: 10px;
    position: absolute;
    transform: translateX(${(props): number => props.translateX}px);
    width: ${COLUMN_WIDTH_PX}px;
    z-index: ${(props): number => (props.picked || props.focused) ? activeColumnZIndex : columnZIndex};
    background:${(props): string => props.theme.baseTheme.background.lightPrimary};
    border: solid 1px ${(props): string => (props.over && props.theme.baseTheme.background.darkPrimary) ||
        (props.picked && props.theme.baseTheme.background.accent) ||
        (props.focused && props.theme.baseTheme.background.accent) ||
        props.theme.baseTheme.background.lightPrimary};
    user-select: none!important;
`

const ColumnHead = styled.div`
    width: 100%;
    display: flex;
`;

const ColumnTitle = styled.div`
    width: 100%;
    display: flex;
    font-size: ${(props): number => props.theme.fontSize.label.fontSize}px;
    line-height: ${(props): number => props.theme.fontSize.label.lineHeight}px;
    color: ${(props): string => props.theme.baseTheme.color.primaryText};
`;


const ColumnCardList = styled.ul`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin: 10px 0;
`

const Handle = styled.button`
    width: 100%;
    height: 30px;
    border: solid 1px ${(props): string => props.theme.baseTheme.border.divider};
    border-radius: 15px;
    cursor: pointer;
    background: ${(props): string => props.theme.baseTheme.background.lightPrimary};
    
    &:hover {
        background: ${(props): string => props.theme.baseTheme.background.primary};
    }
    
    &:focus {
        background: ${(props): string => props.theme.baseTheme.background.accent};
        outline: none;
    }

    &:active {
        background: ${(props): string => props.theme.baseTheme.background.accent};
    }

`;

const ColumnDelete = styled.button``;

export type ColumnStylesheetType = {
    StatusColumnWrapper: typeof StatusColumnWrapper;
    ColumnHead: StyledComponent<"div", any, {}, never>;
    ColumnDelete: StyledComponent<"button", any, {}, never>;
    ColumnTitle: StyledComponent<"div", any, {}, never>;
    ColumnCardList: typeof ColumnCardList;
    Handle: typeof Handle;
}

const ColumnStylesheet: ColumnStylesheetType = {
    StatusColumnWrapper,
    ColumnHead,
    ColumnDelete,
    ColumnTitle,
    ColumnCardList,
    Handle
}

export default ColumnStylesheet;
