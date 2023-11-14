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


export const gameRepository = {
    createGame,
    getGames
}