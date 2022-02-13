import styled, { StyledComponent } from 'styled-components';

const Button = styled.button`
    height: ${(props): number => props.theme.form.input.height}px;
    width: ${(props): number => props.theme.form.input.width}px;
    border-radius: ${(props): number => props.theme.form.input.borderRadius}px;
    border: none;
    background: ${(props) => props.theme.baseTheme.background.primary};
    color: ${(props) => props.theme.baseTheme.color.textOnPrimaryBg};
    box-sizing: border-box;
`

const Label = styled.span``;

export type ButtonStylesheetType = {
    Button: StyledComponent<"button", any, {}, never>;
    Label: StyledComponent<"span", any, {}, never>;
}

const ButtonStylesheet: ButtonStylesheetType = {
    Button,
    Label
}

export default ButtonStylesheet;
