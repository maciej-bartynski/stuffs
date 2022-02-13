import styled from "styled-components";

type CardTitleProps = {
    maxWidth?: string,
}

const CardTitle = styled.div<CardTitleProps>`
    max-width: ${(props): string => props.maxWidth || "unset"};
    color: ${(props): string => props.theme.baseTheme.color.textOnPrimaryBg};
    font-size: ${(props): number => props.theme.fontSize.tileTitle.fontSize}px;
    line-height: ${(props): number => props.theme.fontSize.tileTitle.lineHeight}px;
`;

export default CardTitle;