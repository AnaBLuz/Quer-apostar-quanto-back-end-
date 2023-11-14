import { GameParams } from "../protocols";
import { Game } from "@prisma/client";
import { gameRepository } from "../repositories/index";


async function postGame({homeTeamName,awayTeamName}: GameParams): Promise<Game> {
    return gameRepository.createGame({homeTeamName,awayTeamName});

}

export const gameService = {
    postGame
}