import { ApplicationError } from "protocols";

export function insufficientBalanceError(): ApplicationError{
    return{
        name: 'InsufficientBalanceError',
        message: 'Insufficient balance, please increase your balance to be able to participate'
    }
}