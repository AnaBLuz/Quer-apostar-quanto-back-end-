import { Request, Response } from 'express';
import httpStatus from 'http-status'; 
import { ParticipantParams } from '../protocols';
import { participantService } from '../services/index';


async function participantPost(req: Request, res: Response) {
    const { name, balance } = req.body as ParticipantParams;

    const participant = await participantService.createParticipant({name, balance});

    return res.status(httpStatus.CREATED).json(participant);
}

export const participantController = {
    participantPost
}