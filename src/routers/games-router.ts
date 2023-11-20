import { Router } from 'express';
import { validateSchemaMiddleware } from '../middlewares/validation-middleware';
import { createGameSchema, finishedGameSchema } from '../schemas/games-schema';
import { gameController } from '../controllers/index';


const gameRouter = Router();

gameRouter.post('/games',validateSchemaMiddleware(createGameSchema), gameController.gamePost);
gameRouter.get('/games', gameController.gameGet);
gameRouter.get('/games/:id',gameController.getGameAndBets);
gameRouter.post('/games/:id/finish', validateSchemaMiddleware(finishedGameSchema),gameController.updateGameToFinished);

export {gameRouter}