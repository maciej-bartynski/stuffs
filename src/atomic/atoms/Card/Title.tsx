import styled from "styled-components";

type CardTitleProps = {
    maxWidth?: string,
}

const CardTitle = styled.div<CardTitleProps>`
    max-width: ${(props): string => props.maxWidth || "unset"};
    font-size: ${(props): number => props.theme.fontSize.tileTitle.fontSize}px;
    line-height: ${(props): number => props.theme.fontSize.tileTitle.lineHeight}px;
`;

export default CardTitle;