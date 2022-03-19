import Button from 'atomic/atoms/Button';
import styled, { StyledComponent } from 'styled-components';

const ToggleableFormWrapper = styled.div<{ clicked: boolean }>`
    border-radius: ${(props): number => props.theme.radius.base}px;
    padding: 10px;
    background: ${(props): string => props.theme.baseTheme.background.lightPrimary};
    display: inline-block;
`

const ToggleableFormButton = styled(Button)`
    margin-bottom: 10px;
`

const MainLabel = styled.div`
    font-size: ${(props): number => props.theme.fontSize.label.fontSize}px;
    line-height: ${(props): number => props.theme.fontSize.label.lineHeight}px;
    color: ${(props): string => props.theme.baseTheme.color.secondaryText};
`;

const ToggleableFormStylesheet = {
    ToggleableFormWrapper,
    ToggleableFormButton,
    MainLabel
}

type ToggleableFormStylesheetType = typeof ToggleableFormStylesheet

export default ToggleableFormStylesheet;
export type {
    ToggleableFormStylesheetType
}
