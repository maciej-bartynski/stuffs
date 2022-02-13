import Input from "atomic/atoms/Input";
import ToggleableForm from "atomic/molecules/ToggleableForm";
import useStatusForm from "hooks/useStatusForm";
import { useEffect, useRef } from "react";
import AddStatusFormStylesheet, { AddStatusFormStylesheetType } from "./AddStatusForm.stylesheet";

type Props = {
    Atoms?: AddStatusFormStylesheetType
}

const AddStatusForm: React.FC<Props> = ({
    Atoms = AddStatusFormStylesheet
}) => {

    const form = useStatusForm();
    const inputRef = useRef<HTMLInputElement>(null);
    const submitRef = useRef<HTMLButtonElement>(null);

    const { setOrder, statuses, order } = form;
    useEffect(() => {
        const firstOrder = 0;
        const incrementOrder = 1;
        const lastsOccupiedOrder = [...statuses].sort((a, b) => a.order - b.order).pop()?.order;
        const availableOrder = typeof lastsOccupiedOrder === 'number' ? lastsOccupiedOrder + incrementOrder : firstOrder;
        if (availableOrder !== order) setOrder(availableOrder);
    }, [setOrder, order, statuses])

    return (
        <ToggleableForm
            label="+ Add status"
            inputRef={inputRef}
            submitRef={submitRef}
            submit={form.submit}
            valid={form.valid}
        >
            <>
                <Input
                    ref={inputRef}
                    placeholder="Status name"
                    value={form.name}
                    onChange={({ target }): void => form.setName(target.value)}
                    error={form.errors.name}
                    touched={form.dirty}
                />
                <Atoms.AddStatusFormButton
                    ref={submitRef}
                    type='button'
                    label='Add status'
                />
            </>
        </ToggleableForm>
    )
}

export default AddStatusForm;