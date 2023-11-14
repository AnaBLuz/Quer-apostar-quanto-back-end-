import { Participant } from '@prisma/client';
import { Game } from '@prisma/client';

export type ParticipantParams = Pick<Participant, 'name' | 'balance'>;
export type GameParams = Pick<Game, 'homeTeamName' | 'awayTeamName'>;

export type ApplicationError = {
    name: string;
    message: string;
  };