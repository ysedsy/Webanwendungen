const request = require("supertest");
const app = require("./server");

describe("Bird Lexicon API", () => {

    test("GET / should return API status text", async () => {
        const response = await request(app).get("/");

        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("Bird Lexicon API is running");
    });

    test("GET /birds should return JSON array", async () => {
        const response = await request(app).get("/birds");

        expect(response.statusCode).toBe(200);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("GET /birds should contain bird connection data", async () => {
        const response = await request(app).get("/birds");

        expect(response.statusCode).toBe(200);

        if (response.body.length > 0) {
            const bird = response.body[0];

            expect(bird).toHaveProperty("BirdID");
            expect(bird).toHaveProperty("CommonName");
            expect(bird).toHaveProperty("ScientificName");
            expect(bird).toHaveProperty("HabitatName");
            expect(bird).toHaveProperty("ImagePath");
        }
    });

});