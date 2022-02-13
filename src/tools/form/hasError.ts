import isRichError from "./isRichError";
import { Error, ErrorSeverity } from "./setErrors";

function hasError(errors: Record<string, Error>): boolean {
    return Object
        .values(errors)
        .reduce<boolean>((isError, value) => {
            if (isRichError(value)) {
                return value.severity === ErrorSeverity.Error || isError;
            }
            return !!value || isError;
        }, false)
}

export default hasError;