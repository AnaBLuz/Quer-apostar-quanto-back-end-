import { Participant } from '@prisma/client';
import { Game } from '@prisma/client';
import { Bet } from '@prisma/client';

export type ParticipantParams = Pick<Participant, 'name' | 'balance'>;
export type GameParams = Pick<Game, 'homeTeamName' | 'awayTeamName'>;
export type BetParams = Pick<Bet, 'homeTeamScore' | 'awayTeamScore' | 'amountBet' | 'gameId' | 'participantId'>;
export type GameFinhesdParams = Pick<Game, 'homeTeamScore' | 'awayTeamScore'>;

export interface GameWithBets extends Game{
  bets: Bet[];
}


export type ApplicationError = {
    name: string;
    message: string;
  };