import supertest from "supertest";
import app from "../src/app";
import httpStatus from "http-status";
import { faker } from '@faker-js/faker';
import prisma from "database";
import { string } from "joi";

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

      it('should respond with status 422 when the balance is less than 1000', async() =>{
        const response = await api.post('/participants').send({ name: faker.person.fullName, balance:50 });
        expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
        
      })
      describe('when body is valid', () => {
        it('should respond with status 201 and create user when given name is unique and balance is bigger or equal 1000', async () => {
          //const validBody = { name: faker.person.fullName, balance:2000}
  
          const response = await api.post('/participants').send({ name: "joao", balance:2000 });
          expect(response.status).toBe(httpStatus.CREATED);
          expect(response.body).toEqual({
            id: expect.any(Number),
            createdAt: expect.any(Date), 
	          updatedAt: expect.any(Date),
	          name: expect.any(String),
	          balance: expect.any(Number)
          });
          
        });
      })
    
})