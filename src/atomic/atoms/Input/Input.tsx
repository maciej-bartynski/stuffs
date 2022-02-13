import { ChangeEventHandler, forwardRef, KeyboardEventHandler } from "react"
import isRichError from "tools/form/isRichError"
import { Error, ErrorSeverity } from "tools/form/setErrors"
import InputStylesheet, { InputStylesheetType } from "./Input.stylesheet"

type InputProps = {
    className?: string;
    value: string,
    placeholder?: string,
    label?: string,
    error: Error,
    touched?: boolean,
    disabled?: boolean,
    Atoms?: InputStylesheetType,
    onChange: ChangeEventHandler<HTMLInputElement>,
    onBlur?: ChangeEventHandler<HTMLInputElement>,
    onFocus?: ChangeEventHandler<HTMLInputElement>,
    onKeyPress?: KeyboardEventHandler<HTMLInputElement>,
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
    className,
    onChange,
    value,
    placeholder,
    label,
    error,
    touched,
    disabled,
    Atoms = InputStylesheet,
    onFocus,
    onBlur,
    onKeyPress
}, ref) => {

    let errorMessage: string | undefined | null | false;
    let errorSeverity: ErrorSeverity;
    if (isRichError(error)) {
        const { severity, message } = error;
        errorMessage = message;
        errorSeverity = severity;
    } else {
        errorMessage = error;
        errorSeverity = ErrorSeverity.Error;
    }

    return (
        <Atoms.Wrapper className={className}>
            <Atoms.Label>
                <Atoms.Title>
                    {label}
                </Atoms.Title>
                <Atoms.Input
                    ref={ref}
                    value={value}
                    placeholder={placeholder}
                    disabled={disabled}
                    onChange={onChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onKeyPress={onKeyPress}
                />
            </Atoms.Label>
            {touched && <Atoms.Error severity={errorSeverity}>
                {errorMessage}
            </Atoms.Error>}
        </Atoms.Wrapper>
    )
})

export default Input;