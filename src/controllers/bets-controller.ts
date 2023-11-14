import { Request, Response } from 'express';
import httpStatus from 'http-status'; 
import { BetParams } from '../protocols';
import { betService, participantService, gameService } from '../services/index';
import { notFoundError } from '../errors/index';


async function betPost(req:Request, res:Response){
    const {homeTeamScore, awayTeamScore, amountBet, gameId,participantId} = req.body as BetParams;
    const participantExists = participantService.getParticipantById(participantId);
    if(!participantExists){
           throw notFoundError();
    }
    const gameExists = gameService.getGameById(gameId);
    if(!gameExists){
        throw notFoundError();
    }
   const bet = await betService.postBet({homeTeamScore, awayTeamScore, amountBet, gameId,participantId});

   return res.status(httpStatus.CREATED).json(bet);
}

export const betController = {
    betPost
}