import prisma from "./../database"
import { ParticipantParams } from "../protocols"

async function getParticipantByName(name: string){
    return prisma.participant.findUnique({
        where: { name }
    })
}

async function createParticipant(data: ParticipantParams){
    return prisma.participant.create({
        data
    });
}

async function getParticipants(){
    return prisma.participant.findMany();
}

export const participantRepository = {
    getParticipantByName,
    createParticipant,
    getParticipants
}