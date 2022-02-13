export enum ErrorSeverity {
    Error = 'error',
    Warning = 'warning',
}

export type RichError = {
    message: string,
    severity: ErrorSeverity
}

export type SimpleError = string | false | null | undefined;

export type Error = RichError | SimpleError;

type Validator<T> = (value: T) => Error
export type Validators<Form> = {
    [Key in keyof Form]?: Validator<Form[Key]>;
}

export type Errors<Form> = {
    [Key in keyof Form]: Error
}

function setErrors<Form>(
    values: Form,
    validators: Validators<Form>
): Errors<Form> {

    const errors = {} as Errors<Form>;

    Object
        .entries(values)
        .forEach((entry) => {
            const [fieldName, fieldValue] = entry;
            const key = fieldName as keyof Form;
            const value = fieldValue as Form[keyof Form];
            const method = validators[key];
            const error = method ? method(value) : "";
            errors[key] = error;
        });

    return errors;
}

export default setErrors;
