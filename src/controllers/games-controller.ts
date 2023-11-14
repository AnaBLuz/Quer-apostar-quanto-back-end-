import { Request, Response } from 'express';
import httpStatus from 'http-status'; 
import { GameParams } from '../protocols';
import { gameService } from '../services/index';


async function gamePost(req: Request, res: Response){
    const {homeTeamName,awayTeamName} = req.body as GameParams;

    const game = await gameService.postGame({homeTeamName,awayTeamName});

    return res.status(httpStatus.CREATED).json(game);

}

async function gameGet(req:Request, res:Response){
    const games = await gameService.getGames();
    return res.status(httpStatus.OK).json(games);
}


export const gameController = {
    gamePost,
    gameGet
}