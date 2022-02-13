import styled, { StyledComponent } from 'styled-components';
import { COLUMN_WIDTH_PX } from './lib';

const StatusColumnWrapper = styled.div`
    border-radius: ${(props): number => props.theme.radius.base}px;
    padding: 10px;
    border: solid 1px ${(props): string => props.theme.baseTheme.background.lightPrimary};
    display: inline-block;
    margin-right: 20px;
`
const AddStatusWrapper = styled.div<{ translateX: number }>`
    width: ${COLUMN_WIDTH_PX}px;
    transform: translateX(${(props): number => props.translateX}px);
`;

const Wrapper = styled.div`
    overflow: auto;
    width: 100%;
    padding: 50px;
`

const Track = styled.div`
    position: relative;
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

const ColumnCard = styled.li`
    width: 100%;
`

const ColumnDelete = styled.button``;

export type StatusColumnStylesheetType = {
    StatusColumnWrapper: StyledComponent<"div", any, {}, never>;
    Wrapper: StyledComponent<"div", any, {}, never>;
    Track: StyledComponent<"div", any, {}, never>;
    ColumnHead: StyledComponent<"div", any, {}, never>;
    ColumnDelete: StyledComponent<"button", any, {}, never>;
    ColumnTitle: StyledComponent<"div", any, {}, never>;
    ColumnCard: typeof ColumnCard;
    ColumnCardList: typeof ColumnCardList;
    AddStatusWrapper: typeof AddStatusWrapper;
}

const StatusColumnStylesheet: StatusColumnStylesheetType = {
    StatusColumnWrapper,
    Wrapper,
    Track,
    ColumnHead,
    ColumnDelete,
    ColumnTitle,
    ColumnCard,
    ColumnCardList,
    AddStatusWrapper
}

export default StatusColumnStylesheet;
