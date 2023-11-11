import { ApplicationError } from "protocols";

export function duplicateNameError(): ApplicationError{
    return{
        name: 'DuplicateNameError',
        message: 'There is already an participant with given name'
    }
}