import { Participant } from '@prisma/client';

export type ParticipantParams = Pick<Participant, 'name' | 'balance'>;

export type ApplicationError = {
    name: string;
    message: string;
  };