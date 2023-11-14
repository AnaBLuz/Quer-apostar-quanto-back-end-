import { Router } from 'express';
import { validateSchemaMiddleware } from '../middlewares/validation-middleware';
import { createGameSchema } from '../schemas/games-schema';
import { gameController } from '../controllers/index';


const gameRouter = Router();

gameRouter.post('/games',validateSchemaMiddleware(createGameSchema), gameController.gamePost);

export {gameRouter}