import { Bet } from "@prisma/client";
import { BetParams } from "protocols";
import { participantRepository, betRepository, gameRepository } from "../repositories/index";

import { insufficientBalanceError, gameFinishedError } from "../errors/index";

async function postBet(data: BetParams): Promise<Bet> {
    const participant = await participantRepository.getParticipantById(data.participantId);
    const currentBalance = participant.balance;
    if(data.amountBet > currentBalance){
         throw insufficientBalanceError();
    }

    const game = await gameRepository.getGameById(data.gameId);
    if(game.isFinished === true){
        throw gameFinishedError();
    }
    
   return betRepository.createBet(data);
}

export const betService = {
    postBet
}