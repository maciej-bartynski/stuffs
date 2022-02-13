import Input from "atomic/atoms/Input";
import ToggleableForm from "atomic/molecules/ToggleableForm";
import useTaskForm from "hooks/useTaskForm";
import { StatusUuid } from "models/Status/Status.types";
import { useEffect, useRef } from "react";
import AddTaskFormStylesheet, { AddTaskFormStylesheetType } from "./AddTaskForm.stylesheet";

type Props = {
    Atoms?: AddTaskFormStylesheetType,
    status: StatusUuid,
}

const AddTaskForm: React.FC<Props> = ({
    Atoms = AddTaskFormStylesheet,
    status,
}) => {
    const {
        name,
        setName,
        setStatus,
        submit,
        valid,
        errors,
        dirty
    } = useTaskForm();

    const inputRef = useRef<HTMLInputElement>(null);
    const submitRef = useRef<HTMLButtonElement>(null);

    return (
        <ToggleableForm
            inputRef={inputRef}
            submitRef={submitRef}
            submit={submit}
            label="+ Add task"
            valid={valid}
        >
            <>
                <Input
                    ref={inputRef}
                    placeholder="Task name"
                    value={name || ""}
                    onChange={({ target }): void => setName(target.value)}
                    error={errors.name}
                    touched={dirty}
                />
                <HiddenFields
                    setStatus={setStatus}
                    status={status}
                />
                <Atoms.AddTaskFormButton
                    ref={submitRef}
                    type='button'
                    label='Add task'
                />
            </>
        </ToggleableForm>
    )
}

export default AddTaskForm;

const HiddenFields: React.FC<{
    setStatus: (status: StatusUuid | undefined) => void,
    status: StatusUuid,
}> = ({ setStatus, status }) => {
    
    useEffect(() => {
        setStatus(status)
    }, [setStatus, status]);

    return null;
}