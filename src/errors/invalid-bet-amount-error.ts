import { ApplicationError } from "protocols";

export function invalidBetAmountError(): ApplicationError{
    return{
        name: 'InvalidBetAmountError',
        message: 'Invalid bet amount!'
    }
}