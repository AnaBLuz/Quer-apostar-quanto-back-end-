import { ParticipantParams } from "protocols";
import { Participant } from "@prisma/client";
import { participantRepository } from "../repositories/index";
import { duplicateNameError, insufficientBalanceError } from "../errors/index";


async function createParticipant({name, balance}:ParticipantParams): Promise<Participant>{

     const participantAlreadyExists = await participantRepository.getParticipantByName(name);
     if(participantAlreadyExists){
        throw duplicateNameError();
     }
     if(balance < 1000){
      throw insufficientBalanceError();
     }

     return participantRepository.createParticipant({
        name,
        balance
     });
}

export const participantService = {
    createParticipant
}