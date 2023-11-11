import { Router } from 'express';
import { validateSchemaMiddleware } from '../middlewares/validation-middleware';
import { createBetsSchema } from '../schemas/bets-schema';

const betsRouter = Router();

betsRouter.post('/bets', validateSchemaMiddleware(createBetsSchema), )