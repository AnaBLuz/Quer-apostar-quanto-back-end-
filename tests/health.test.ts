import supertest from "supertest";
import app from "../src/app";

const api = supertest(app);

describe("Health API", () => {
    it("should return 200", async () => {
        const result = await api.get('/health');
        expect(result.status).toBe(200)
    })
} )