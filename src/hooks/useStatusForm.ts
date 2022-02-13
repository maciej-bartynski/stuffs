import StatusFormUtils from "models/Status/Status.initializer";
import { StatusForm, StatusType, StatusUuid } from "models/Status/Status.types";
import { useCallback } from "react";
import useStatusesStore from 'store/statusesStore';
import { Errors } from "tools/form/setErrors";
import useForm from "./useForm";

const useStatusForm = (statusId?: StatusUuid) : {
    name: string;
    order: number,
    submit: () => void;
    valid: boolean;
    dirty: boolean;
    setName: (name?: string | undefined) => void;
    setOrder: (order: StatusType['order']) => void;
    errors: Errors<Partial<StatusForm>>;
    statuses: StatusType[];
} => {

    const { createStatus, updateStatus, statusById, statuses } = useStatusesStore(statusId);

    const { form, submit, valid, dirty, errors, onChange } = useForm<StatusForm>({
        initialValues: statusById || StatusFormUtils.statusFormInitializer,
        validators: StatusFormUtils.statusFormValidators,
        onSubmit: ({ values, resetForm }) => {
            const performAction = statusById
                ? (): void => updateStatus({ ...statusById, ...values })
                : (): void => createStatus(values);
            performAction();
            resetForm();
        }
    })

    const setName = useCallback((name?: StatusType['name']) => {
        onChange({ name });
    }, [onChange]);

    const setOrder = useCallback((order: StatusType['order']): void => {
        onChange({ order })
    }, [onChange])

    return {
        name: form.name,
        order: form.order,
        submit,
        valid,
        dirty,
        setName,
        setOrder,
        errors,
        statuses
    }
}

export default useStatusForm;