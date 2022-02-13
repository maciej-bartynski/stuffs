import { Reducer, useCallback, useMemo, useReducer } from "react"
import dirty from "tools/form/dirty";
import hasError from "tools/form/hasError";
import setErrors, { Errors, Validators } from "tools/form/setErrors";

type FormAction<Form> = Partial<Form>;

type FormState<Form> = Form;

type FormTouchedFields<Form> = Partial<Record<keyof Form, boolean>>;
type FormTouchAction<Form> = Partial<Record<keyof Form, boolean>>;

type OnSubmit<Form> = (param: {
    values: Form,
    errors: Errors<Partial<Form>>,
    touched: Partial<Record<keyof Form, boolean>>,
    dirty: boolean,
    valid: boolean,
    setField: (action: FormAction<Form>) => void,
    setTouched: (touched: Partial<Record<keyof Form, boolean>>) => void,
    onChange: (action: FormAction<Form>) => void,
    resetForm: () => void;
}) => void;

function useForm<Form>({
    initialValues,
    validators,
    onSubmit,
    onFail,
}: {
    initialValues: FormState<Form>,
    validators: Validators<Form>,
    onSubmit?: OnSubmit<Form>;
    onFail?: OnSubmit<Form>
}): {
    form: Form;
    touched: Partial<Record<keyof Form, boolean>>;
    errors: Errors<Partial<Form>>;
    dirty: boolean;
    valid: boolean;
    setField: (action: FormAction<Form>) => void;
    setTouched: (touchedByAction: Partial<Record<keyof Form, boolean>>) => void;
    onChange: (action: FormAction<Form>) => void;
    submit: () => void;
} {
    const [touched, dispatchTouch] = useReducer<Reducer<FormTouchedFields<Form>, FormTouchAction<Form>>>((state, action) => ({
        ...state,
        ...action
    }), {});

    const [form, dispatch] = useReducer<Reducer<FormState<Form>, FormAction<Form>>>((state, action) => ({
        ...state,
        ...action
    }), initialValues);

    const errors = setErrors(form, validators);
    const valid = !hasError(errors);

    const setTouched = useCallback((touchedByAction: Partial<Record<keyof Form, boolean>>) => {
        dispatchTouch(touchedByAction)
    }, [dispatchTouch])

    const setField = useCallback((action: FormAction<Form>) => {
        dispatch(action);
    }, [
        dispatch
    ])

    const onChange = useCallback((action: FormAction<Form>) => {
        dispatch(action);
        const touchedByAction = setTouchedByAction(action);
        setTouched(touchedByAction);
    }, [
        dispatch,
        setTouched
    ])

    const resetForm = useCallback(() => {
        setField(initialValues);
        const unset = unsetTouchedByAction(form)
        setTouched(unset)
    }, [ initialValues, setField, setTouched ])

    const isDirty = dirty(touched);
    const submit = useMemo(() => (): void => {
        const submitParams = {
            dirty: isDirty,
            valid,
            values: form as Form,
            touched,
            errors,
            setField,
            setTouched,
            onChange,
            resetForm
        }

        const touchedByAction = setTouchedByAction(form);
        setTouched(touchedByAction);

        if (valid) {
            onSubmit && onSubmit(submitParams)
        } else {
            onFail && onFail(submitParams)
        }
    }, [
        onFail,
        onSubmit,
        isDirty,
        valid,
        form,
        touched,
        errors,
        setField,
        setTouched,
        onChange,
        resetForm
    ])

    return {
        form,
        touched,
        errors,
        dirty: isDirty,
        valid,
        setField,
        setTouched,
        onChange,
        submit,
    }
}

export default useForm;

function setTouchedByAction<Form>(action: FormAction<Form>) {
    const touchedByAction = Object.fromEntries(Object.keys(action).map(key => ([key, true]))) as Partial<Record<keyof Form, boolean>>;
    return touchedByAction;
}

function unsetTouchedByAction<Form>(action: FormAction<Form>) {
    const touchedByAction = Object.fromEntries(Object.keys(action).map(key => ([key, false]))) as Partial<Record<keyof Form, boolean>>;
    return touchedByAction;
}