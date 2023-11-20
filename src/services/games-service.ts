import { GameParams, GameWithBets } from "../protocols";
import { Game } from "@prisma/client";
import { gameRepository } from "../repositories/index";


async function postGame({homeTeamName,awayTeamName}: GameParams): Promise<Game> {
    return gameRepository.createGame({homeTeamName,awayTeamName});

}

async function getGames(): Promise<Game[]>{
   return gameRepository.getGames();
}

async function getGameById(id: number): Promise<Game> {
    return gameRepository.getGameById(id);
}

async function getGameAndBets(id: number): Promise<GameWithBets> {
  return gameRepository.getGameAndBets(id);
}

async function updateGameToFinished(gameId, homeTeamScore, awayTeamScore){
    return gameRepository.updateGameToFinished(gameId, homeTeamScore, awayTeamScore);
}

export const gameService = {
    postGame,
    getGames,
    getGameById,
    getGameAndBets,
    updateGameToFinished
}