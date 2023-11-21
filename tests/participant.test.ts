import supertest from "supertest";
import app from "../src/app";
import httpStatus from "http-status";
import { faker } from '@faker-js/faker';
import prisma from "database";
import { insufficientBalanceError } from "../src/errors";

const api = supertest(app);

beforeEach(async () => {
  await prisma.participant.deleteMany();
});

describe("POST /participant", () => {
    it('should respond with status 422 when body is not given', async () => {
        const response = await api.post('/participants');
    
        expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
      });
    
      it('should respond with status 422 when body is not valid', async () => {
        const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };
    
        const response = await api.post('/participants').send(invalidBody);
    
        expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
      });

      it('should respond with status 400 when the balance is less than 1000', async() =>{
        const response = await api.post('/participants').send({ name: "Aline", balance:50 });
        expect(response.status).toBe(httpStatus.BAD_REQUEST);
      
        
      })
      
})