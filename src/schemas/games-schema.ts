import Joi from 'joi';

export const createGameSchema = Joi.object({
        homeTeamName: Joi.string().required(),
        awayTeamName: Joi.string().required()
})

export const finishedGameSchema = Joi.object({
        homeTeamScore: Joi.number().required(),
	awayTeamScore: Joi.number().required()
})