import prisma from "./../database"
import { GameParams } from "protocols"


async function createGame(data: GameParams){
    return prisma.game.create({
        data
    });
}
async function getGames(){
    return prisma.game.findMany();
}

async function getGameById(id: number){
    return prisma.game.findUnique({
        where: { id }
    })
}

async function getGameAndBets(id: number){
   return prisma.game.findUnique({
    where:{
        id
    },
    include: {
        bets: true
    }
   });
} 


export const gameRepository = {
    createGame,
    getGames,
    getGameById,
    getGameAndBets
}