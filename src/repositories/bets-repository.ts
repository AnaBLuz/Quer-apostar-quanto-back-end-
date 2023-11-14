import prisma from "../database";
import { BetParams } from "../protocols";
import { participantRepository } from "./participants-repository";

async function createBet(data: BetParams){
    await participantRepository.updateBalanceParticipant(data.participantId,data.amountBet);
    
    return prisma.bet.create({
        data
    });
}

export const betRepository = {
    createBet
}


