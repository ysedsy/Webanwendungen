const request = require("supertest");
const app = require("./server");

describe("Bird Lexicon API", () => {

    test("GET /api should return API status", async () => {
        const response = await request(app).get("/api");

        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("Bird Lexicon API is running");
    });

    test("GET /api/birds should return birds as array", async () => {
        const response = await request(app).get("/api/birds");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("GET /api/birds/1 should return one bird or 404", async () => {
        const response = await request(app).get("/api/birds/1");

        expect([200, 404]).toContain(response.statusCode);

        if (response.statusCode === 200) {
            expect(response.body).toHaveProperty("BirdID");
            expect(response.body).toHaveProperty("CommonName");
            expect(response.body).toHaveProperty("ScientificName");
            expect(response.body).toHaveProperty("HabitatName");
        }
    });

    test("GET /api/habitats should return habitats as array", async () => {
        const response = await request(app).get("/api/habitats");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("GET /api/threads should return threads as array", async () => {
        const response = await request(app).get("/api/threads");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("POST /api/threads should create a new thread", async () => {
        const response = await request(app)
            .post("/api/threads")
            .send({
                threadTitle: "Test Thread",
                userName: "Anonymous",
                postText: "This is a test post."
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("message", "Thread created");
        expect(response.body).toHaveProperty("threadID");
    });

    test("POST /api/threads should fail without postText", async () => {
        const response = await request(app)
            .post("/api/threads")
            .send({
                threadTitle: "Broken Thread"
            });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    test("POST /api/threads/:id/posts should create post in existing thread", async () => {
        const threadResponse = await request(app)
            .post("/api/threads")
            .send({
                threadTitle: "Thread for reply test",
                userName: "Tester",
                postText: "First post."
            });

        const threadID = threadResponse.body.threadID;

        const response = await request(app)
            .post(`/api/threads/${threadID}/posts`)
            .send({
                userName: "ReplyUser",
                postText: "This is a reply."
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("message", "Post created");
        expect(response.body).toHaveProperty("postID");
    });

    test("POST /api/threads/999999/posts should return 404", async () => {
        const response = await request(app)
            .post("/api/threads/999999/posts")
            .send({
                userName: "Nobody",
                postText: "This should fail."
            });

        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("error", "Thread not found");
    });
});