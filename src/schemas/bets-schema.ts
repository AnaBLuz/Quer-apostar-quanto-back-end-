import Joi from 'joi'

export const createBetsSchema = Joi.object({
    homeTeamScore: Joi.number().required(),
	awayTeamScore: Joi.number().required(),
	amountBet: Joi.number().required(),
	gameId: Joi.number().required(), 
	participantId: Joi.number().required()
})