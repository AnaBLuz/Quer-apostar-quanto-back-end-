import prisma from "./../database"
import { GameParams } from "protocols"


async function createGame(data: GameParams){
    return prisma.game.create({
        data
    });
}


export const gameRepository = {
    createGame
}