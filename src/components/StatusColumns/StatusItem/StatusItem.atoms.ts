import { SCROLLBAR_WIDTH_PX, TRANSITION_STYLE_BASE } from 'consts/variables';
import styled from 'styled-components';

const Column = styled.div<{
    width: number,
    picked: boolean,
    height: number,
    maxHeight: number,
    minHeight: number,
}>`
    border-radius: ${(props): number => props.theme.radius.base}px;
    width: ${(props): number => props.width}px;
    height: ${(props): number => props.height}px;
    max-height: ${(props): number => props.maxHeight}px;
    min-height: ${(props): number => props.minHeight}px;
    user-select: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background: white;
    transition: all ${TRANSITION_STYLE_BASE};
    position: relative;
    box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1);
    ${(props): string => {
        if (props.picked) {
            return `
                box-shadow: 0px 0px 30px 0px rgba(0,0,0,0.2);
                transform: scale(1.05);
            `
        }

        return ""
    }};

    &:after {
        content: "";
        width: 16px;
        height: 16px;
        border-radius: 50%;
        position: absolute;
        padding: 0;
        left: calc(50% - 8px);;
        margin-top: -8px;
        top: 0;
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
const Header = styled.div`
    width: 100%;
    display: flex;
    padding: 0 ${SCROLLBAR_WIDTH_PX}px;
    height: 30px;
    padding-top: 10px;
    line-height: 20px;
    font-size: 10px;
`;

const Outer = styled.div<{ headerHeight: number }>`
    width: 100%;
    overflow: hidden;
    height: calc(100% - ${(props): number => props.headerHeight}px);
`

const doubledScrollSize = 2;
const Content = styled.div`
    width: calc(100% + ${doubledScrollSize * SCROLLBAR_WIDTH_PX}px);
    overflow: auto;
    height: 100%;
`;

const Inner = styled.div<{ width: number, height: number }>`
    width: ${(props): number => props.width}px;
    height: ${(props): number => props.height}px;
    box-sizing: content-box;

`;

const Footer = styled.div`
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
`

const Title = styled.div`
    width: 90%;
    height: 100%;
    display: flex;
    font-size: ${(props): number => props.theme.fontSize.label.fontSize}px;
    line-height: ${(props): number => props.theme.fontSize.label.lineHeight}px;
    color: ${(props): string => props.theme.baseTheme.color.primaryText};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    text-align: left;
`;

const Delete = styled.button`
    width: 10%;
    height: 100%;
    display: block;
    background: none;
    border: solid 1px ${(props): string => props.theme.baseTheme.background.lightPrimary};
    cursor: pointer;
    transition: transform 100ms linear;
    &:active {
        transform: scale(0.9);
    }

    font-size: 10px;
    line-height: 10px;
    color:${(props): string => props.theme.baseTheme.background.lightPrimary};
    border-radius:${(props): number => props.theme.radius.base}px;
`;

const ColumnAtoms = {
    Column,
    Header,
    Delete,
    Title,
    Content,
    Inner,
    Footer,
    Outer
}

export type ColumnAtomsType = typeof ColumnAtoms

export default ColumnAtoms;
