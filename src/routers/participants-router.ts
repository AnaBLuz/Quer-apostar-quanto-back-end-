import { Router } from 'express';
import { validateSchemaMiddleware } from '../middlewares/validation-middleware';
import { createParticipantSchema } from '../schemas/participant-schema';
import { participantController } from '../controllers/index';

const participantsRouter = Router();

participantsRouter.post('/participants', validateSchemaMiddleware(createParticipantSchema), participantController.participantPost)
participantsRouter.get('/participants', participantController.participantGet)

export { participantsRouter };