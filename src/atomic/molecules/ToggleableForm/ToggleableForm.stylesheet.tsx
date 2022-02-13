import Button from 'atomic/atoms/Button';
import styled, { StyledComponent } from 'styled-components';

const ToggleableFormWrapper = styled.div`
    border-radius: ${(props): number => props.theme.radius.base}px;
    padding: 10px;
    background: ${(props): string => props.theme.baseTheme.background.lightPrimary};
    width: 222px;
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
export type ToggleableFormStylesheetType = {
    ToggleableFormWrapper: StyledComponent<"div", any, {}, never>;
    ToggleableFormButton: typeof ToggleableFormButton;
    MainLabel: StyledComponent<"div", any, {}, never>;
}

const ToggleableFormStylesheet: ToggleableFormStylesheetType = {
    ToggleableFormWrapper,
    ToggleableFormButton,
    MainLabel
}

export default ToggleableFormStylesheet;
