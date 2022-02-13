import styled from "styled-components";

type CardLabelProps = {
    maxWidth?: string,
}

const CardLabel = styled.div<CardLabelProps>`
    max-width: ${(props): string => props.maxWidth || "unset"};
    color: ${(props): string => props.theme.baseTheme.color.textOnPrimaryBg};
    font-size: ${(props): number => props.theme.fontSize.label.fontSize}px;
    line-height: ${(props): number => props.theme.fontSize.label.lineHeight}px;
`;

export default CardLabel;