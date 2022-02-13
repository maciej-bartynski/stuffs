import styled from "styled-components";

type CardProps = {
    maxWidth?: string,
}

const Card = styled.div<CardProps>`
    width: 100%;
    max-width: ${(props): string => props.maxWidth || 'unset'};
    border-radius: ${(props): number => props.theme.radius.base}px;
    background: ${(props): string => props.theme.baseTheme.background.primary};
    padding: ${(props): number => props.theme.padding.base}px;
`;

export default Card;