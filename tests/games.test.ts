import supertest from "supertest";
import app from "../src/app";
import httpStatus from "http-status";
import { faker } from '@faker-js/faker';
import prisma from "database";

const api = supertest(app);

beforeEach(async () => {
  await prisma.game.deleteMany();
});

describe("POST /games", () => {
    it('should respond with status 422 when body is not given', async () => {
        const response = await api.post('/games');
    
        expect(response.status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
      });
      
})