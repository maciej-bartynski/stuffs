import { forwardRef, MouseEventHandler } from "react";
import ButtonStylesheet, { ButtonStylesheetType } from "./Button.stylesheet";

export type ButtonProps = {
    Atoms?: ButtonStylesheetType,
    label: string,
    type: 'submit' | 'button',
    onClick?: MouseEventHandler<HTMLButtonElement>;
    className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    label, type, Atoms = ButtonStylesheet, onClick, className, ...rest
}, ref) => (
    <Atoms.Button
        className={className}
        onClick={onClick}
        type={type}
        {...rest}
        ref={ref}
    >
        <Atoms.Label>
            {label}
        </Atoms.Label>
    </Atoms.Button>
));

export default Button;
