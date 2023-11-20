import { Request, Response } from 'express';
import httpStatus from 'http-status'; 
import { GameParams, GameFinhesdParams } from '../protocols';
import { gameService } from '../services/index';
import { notFoundError } from '../errors/index';
import { gameRepository } from '../repositories/index';



async function gamePost(req: Request, res: Response){
    const {homeTeamName,awayTeamName} = req.body as GameParams;

    const game = await gameService.postGame({homeTeamName,awayTeamName});

    return res.status(httpStatus.CREATED).json(game);

}

async function gameGet(req:Request, res:Response){
    const games = await gameService.getGames();
    return res.status(httpStatus.OK).json(games);
}

async function getGameAndBets(req:Request, res:Response){
    const id = parseInt(req.params.id);
    const gameExists = gameService.getGameById(id);
    if(!gameExists){
        throw notFoundError();
    }
    const game = await gameService.getGameAndBets(id);
    return res.status(httpStatus.OK).json(game);
}

async function updateGameToFinished(req: Request, res:Response){
    const id = parseInt(req.params.id);
    const gameExists = gameService.getGameById(id);
    if(!gameExists){
        throw notFoundError();
    }
    const {homeTeamScore, awayTeamScore } = req.body as GameFinhesdParams;
    const updateGame = gameRepository.updateGameToFinished(id, homeTeamScore, awayTeamScore);
    return res.status(httpStatus.NO_CONTENT).json(updateGame)
}


export const gameController = {
    gamePost,
    gameGet,
    getGameAndBets,
    updateGameToFinished
}