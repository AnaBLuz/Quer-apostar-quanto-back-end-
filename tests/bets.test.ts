import supertest from "supertest";
import app from "../src/app";
import httpStatus from "http-status";
import prisma from "database";
import { insufficientBalanceError, invalidBetAmountError } from "errors";

const api = supertest(app);

beforeEach(async () => {
  await prisma.bet.deleteMany();
});

describe("POST /bets", () => {
    it('should respond with status 422 when body is not given', async () => {
        const response = await api.post('/bets');
    
        expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
      });

    it('should respond with status 400 when bet is less than or equal to zero', async () => {
      const response = await api.post('/bets').send({
        homeTeamScore: 2,
	      awayTeamScore: 1, 
	      amountBet: -1, 
	      gameId: 1, 
	      participantId: 1, 
      });
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
      expect(response.body.message).toBe(invalidBetAmountError().message);
    })
   it('should respond with status 400 when creating a bet with a value greater than the participants current balance', async() => {
    const participant = await prisma.participant.create({
      data: {
        name: "Ana",
        balance: 2000
      }
   });
    const game = await prisma.game.create({
      data:{
        homeTeamName: "Remo",
        awayTeamName: "Paysandu"
      }
    })
    const response = await api.post('/bets').send({
        homeTeamScore: 5,
	      awayTeamScore: 0, 
	      amountBet: 3000, 
	      gameId: game.id, 
	      participantId: participant.id, 
    });
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(insufficientBalanceError().message);
   })

      
})