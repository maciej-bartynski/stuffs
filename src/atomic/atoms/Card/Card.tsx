import styled from "styled-components";

type CardProps = {
    maxWidth?: string,
}

const Card = styled.div<CardProps>`
    width: 100%;
    max-width: ${(props): string => props.maxWidth || 'unset'};
    border-radius: ${(props): number => props.theme.radius.base}px;
    border: solid 1px ${(props): string => props.theme.baseTheme.border.divider};
    padding: ${(props): number => props.theme.padding.base}px;
    color: ${(props): string => props.theme.baseTheme.color.secondaryText};
`;

export default Card;