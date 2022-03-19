import CardAtoms from 'atomic/atoms/Card';
import { SCROLLBAR_WIDTH_PX, TRANSITION_STYLE_BASE } from 'consts/variables';
import styled from 'styled-components';
import { TILE_HEIGHT_PX } from '../StatusColumns.lib';

const doubledScrollSize = 2;
const StyledTile = styled(CardAtoms.Tile)<{ picked: boolean }>`
    height: ${TILE_HEIGHT_PX}px;
    width: calc(250px - ${SCROLLBAR_WIDTH_PX * doubledScrollSize}px);
    margin: 0 auto;
    box-sizing: border-box;
    background: ${(props): string => props.theme.baseTheme.background.lightPrimary};
    border: none;
    transition: transform ${TRANSITION_STYLE_BASE};
    ${(props): string => props.picked 
        ? `transform: scale(1.05)`
        : ""
    };
    ${(props): string => props.picked 
        ? `box-shadow: ${props.theme.shadow.light}`
        : ""
    };
    position: relative;
    &:after {
        content: "";
        width: 16px;
        height: 16px;
        border-radius: 50%;
        position: absolute;
        padding: 0;
        left: -8px;
        margin-top: -8px;
        top: 50%;
        background: ${(props): string => props.theme.baseTheme.background.lightPrimary};
        border: solid 2px white;
        box-sizing: border-box;
        display: block;
        transition: all ${TRANSITION_STYLE_BASE};
        ${(props): string => {
            if (props.picked) {
                return `
                    border-width: 0;
                    background: ${props.theme.baseTheme.background.primary};
                `;
            }
    
            return ""
        }};

    }
`

const Wrapper = styled.div`
    width: 250px;
`;

const TaskItemAtoms = {
    ...CardAtoms,
    Tile: StyledTile,
    Wrapper,
};

type TaskItemAtomsType = typeof TaskItemAtoms;

export default TaskItemAtoms;
export type {
    TaskItemAtomsType
}