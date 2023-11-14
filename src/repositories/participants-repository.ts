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

async function getParticipantById(id: number){
    return prisma.participant.findUnique({
        where: { id }
    })
}

async function updateBalanceParticipant(id: number, amountBet: number){
    const participant = await getParticipantById(id);
    const balance = participant.balance;
    const newBalance = balance - amountBet;
    return prisma.participant.update({
        where: {
            id
        },
        data: {
            balance: newBalance
        }
    })
}

export const participantRepository = {
    getParticipantByName,
    createParticipant,
    getParticipants,
    getParticipantById,
    updateBalanceParticipant
}