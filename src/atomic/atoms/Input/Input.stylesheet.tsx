import styled, { StyledComponent } from 'styled-components';
import { ErrorSeverity } from 'tools/form/setErrors';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    max-width: 200px;
`

const Label = styled.label`
    display: block;
    text-align: left;
`;

const Title = styled.span`
    display: block;
    text-align: left;
`;

const Input = styled.input`
    display: block;
    height: ${(props): number => props.theme.form.input.height}px;
    width: ${(props): number => props.theme.form.input.width}px;
    border-radius: ${(props): number => props.theme.form.input.borderRadius}px;
    font-size: ${(props): number => props.theme.form.input.fontSize}px;
    line-height: ${(props): number => props.theme.form.input.lineHeight}px;
    padding: ${(props): number => props.theme.form.input.padding}px;
    border: none;
    outline: none;
    box-shadow: ${(props): string => props.theme.shadow.base};
    margin: 10px 0;
    &:focus {
        box-shadow: none;
        border: solid 1px ${(props): string => props.theme.baseTheme.background.accent};
    }
`;

type ErrorProps = {
    severity: ErrorSeverity
}
const Error = styled.span<ErrorProps>`
    display: block;
    text-align: left;
`;

export type InputStylesheetType = {
    Wrapper: StyledComponent<"div", any, {}, never>;
    Label: StyledComponent<"label", any, {}, never>;
    Title: StyledComponent<"span", any, {}, never>;
    Input: StyledComponent<"input", any, {}, never>;
    Error: StyledComponent<"span", any, ErrorProps, never>;
}

const InputStylesheet: InputStylesheetType = {
    Wrapper,
    Label,
    Title,
    Input,
    Error,
}

export default InputStylesheet;
