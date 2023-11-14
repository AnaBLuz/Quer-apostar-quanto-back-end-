import { ApplicationError } from '../protocols';

export function gameFinishedError(): ApplicationError {
  return {
    name: 'GameFinishedError',
    message: 'Game already finished!',
  };
}
