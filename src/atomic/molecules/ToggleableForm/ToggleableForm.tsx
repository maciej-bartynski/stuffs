import { KeyboardEventHandler, MouseEventHandler, ReactNode, RefObject, useCallback, useEffect, useRef, useState } from "react";
import ToggleableFormStylesheet, { ToggleableFormStylesheetType } from "./ToggleableForm.stylesheet";

type Props = {
    Atoms?: ToggleableFormStylesheetType,
    submit: Function,
    label: ReactNode,
    valid: boolean,
    inputRef: RefObject<HTMLInputElement>,
    submitRef: RefObject<HTMLButtonElement>,
}

const ToggleableForm: React.FC<Props> = ({
    Atoms = ToggleableFormStylesheet,
    submit,
    valid,
    children,
    label,
    inputRef,
    submitRef,
}) => {

    const [clicked, setClicked] = useState(false);
    const buttonRef = useRef<HTMLDivElement>(null);

    const onFormClick: MouseEventHandler<HTMLElement> = useCallback((e) => {
        e.stopPropagation();
        e.preventDefault();

        const { target } = e;
        const isSubmitClicked = submitRef.current === target || submitRef.current?.contains(target as Node);

        if (isSubmitClicked && valid) {
            submit();
            setClicked(false);
        }

        else {
            inputRef.current?.focus();
            setClicked(true)
        }
    }, [valid, submit, setClicked, inputRef, submitRef])

    const onFormPressEnter: KeyboardEventHandler<HTMLDivElement> = useCallback((e) => {
        const { target } = e;
        const isSubmiting = inputRef.current === target;

        if (e.key === 'Enter') {
            if (isSubmiting && valid) {
                submit();
                setClicked(false);
            }
            else {
                inputRef.current?.focus();
                setClicked(true)
            }
        }
    }, [valid, submit, setClicked, inputRef])

    useEffect(() => {
        inputRef.current?.focus();
    }, [clicked, inputRef])

    useOutsideClickHandler(() => setClicked(false), buttonRef.current);

    const stopPropagation = (e: any) => {
        e.stopPropagation();
        e.preventDefault();
    }
    return (
        <Atoms.ToggleableFormWrapper
            ref={buttonRef}
            onClick={onFormClick}
            onMouseDown={stopPropagation}
            onMouseUp={stopPropagation}
            tabIndex={0}
            onKeyPress={onFormPressEnter}
            clicked={clicked}
        >
            {clicked
                ? children
                : (
                    <Atoms.MainLabel>
                        {label}
                    </Atoms.MainLabel>
                )}
        </Atoms.ToggleableFormWrapper>
    )
}

export default ToggleableForm;

interface UseOutsideClickHandler {
    (callback: Function, clickable: HTMLElement | null): void
}
const useOutsideClickHandler: UseOutsideClickHandler = (callback, clickable) => {
    useEffect(() => {
        const outsideClickListener = ({ target }: MouseEvent): void => {
            const nodeTarget = target as Node;
            if (clickable && !(clickable.contains(nodeTarget) || clickable === nodeTarget)) {
                callback();
            }
        }
        window.addEventListener('click', outsideClickListener);
        return (): void => {
            window.removeEventListener('click', outsideClickListener);
        }
    }, [callback, clickable]);
}