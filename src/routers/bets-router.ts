import { Router } from 'express';
import { validateSchemaMiddleware } from '../middlewares/validation-middleware';
import { createBetsSchema } from '../schemas/bets-schema';
import { betController } from '../controllers/bets-controller';

const betsRouter = Router();

betsRouter.post('/bets', validateSchemaMiddleware(createBetsSchema), betController.betPost);

export { betsRouter }