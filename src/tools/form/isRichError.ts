import { RichError, SimpleError } from "./setErrors";

function isRichError(error: RichError | SimpleError): error is RichError {
    return (error as RichError)?.message !== undefined
}


export default isRichError