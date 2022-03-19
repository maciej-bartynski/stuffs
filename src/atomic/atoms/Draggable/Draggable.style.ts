import { ZERO } from "consts/mathVariables";
import styled from "styled-components";

const Positioner = styled.div`
    display: block;
    width: 0px;
    height: 0px;
`;

const Wrapper = styled.div<{ 
    picked: boolean, 
    x?: number,
    y?: number,
}>`
    display: block;
    height: 100%;
    
    ${(props): string => {
        if (props.picked) {
            return `
                position: fixed;
                top: ${props.y || ZERO}px;
                left: ${props.x || ZERO}px;
                transition: none;
                z-index: 1;
            `;
        }

        return "position: static";
    }}
`;

const DraggableStyles = {
    Wrapper,
    Positioner
}

export default DraggableStyles;

export type DraggableStylesType = typeof DraggableStyles;