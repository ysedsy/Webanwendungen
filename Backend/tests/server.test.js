const request = require("supertest");
const app = require("../src/serverBackend");

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

    // ===== BIRDS TESTS =====

    test("POST /api/birds should create a new bird", async () => {
        const response = await request(app)
            .post("/api/birds")
            .send({
                commonName: "Test Bird",
                scientificName: "Testis avius",
                height: 25.5,
                weight: 150.0,
                habitatID: 1,
                averageAge: 10,
                description: "A test bird for testing"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("message", "Bird created");
        expect(response.body).toHaveProperty("birdID");
    });

    test("POST /api/birds should fail without required fields", async () => {
        const response = await request(app)
            .post("/api/birds")
            .send({
                commonName: "Missing Habitat"
            });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    test("PUT /api/birds/:id should update a bird", async () => {
        const createResponse = await request(app)
            .post("/api/birds")
            .send({
                commonName: "Update Test Bird",
                scientificName: "Updateus testis",
                height: 30.0,
                weight: 200.0,
                habitatID: 1,
                averageAge: 15,
                description: "Original description"
            });

        const birdID = createResponse.body.birdID;

        const response = await request(app)
            .put(`/api/birds/${birdID}`)
            .send({
                commonName: "Updated Bird Name",
                scientificName: "Updateus testis",
                height: 35.0,
                weight: 210.0,
                habitatID: 1,
                averageAge: 20,
                description: "Updated description"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("message", "Bird updated");
    });

    test("PUT /api/birds/999999 should return 404", async () => {
        const response = await request(app)
            .put("/api/birds/999999")
            .send({
                commonName: "Nonexistent"
            });

        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("error", "Bird not found");
    });

    test("DELETE /api/birds/:id should delete a bird", async () => {
        const createResponse = await request(app)
            .post("/api/birds")
            .send({
                commonName: "Delete Test Bird",
                scientificName: "Deleteus testis",
                height: 20.0,
                weight: 100.0,
                habitatID: 1,
                averageAge: 5,
                description: "Will be deleted"
            });

        const birdID = createResponse.body.birdID;

        const response = await request(app)
            .delete(`/api/birds/${birdID}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("message", "Bird deleted");

        const getResponse = await request(app)
            .get(`/api/birds/${birdID}`);

        expect(getResponse.statusCode).toBe(404);
    });

    // ===== HABITAT TESTS =====

    test("POST /api/habitats should create a new habitat", async () => {
        const response = await request(app)
            .post("/api/habitats")
            .send({
                habitatName: "Test Habitat"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("message", "Habitat created");
        expect(response.body).toHaveProperty("habitatID");
    });

    test("POST /api/habitats should fail without habitatName", async () => {
        const response = await request(app)
            .post("/api/habitats")
            .send({});

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    test("PUT /api/habitats/:id should update a habitat", async () => {
        const createResponse = await request(app)
            .post("/api/habitats")
            .send({
                habitatName: "Original Habitat"
            });

        const habitatID = createResponse.body.habitatID;

        const response = await request(app)
            .put(`/api/habitats/${habitatID}`)
            .send({
                habitatName: "Updated Habitat"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("message", "Habitat updated");
    });

    test("DELETE /api/habitats/:id should delete a habitat", async () => {
        const createResponse = await request(app)
            .post("/api/habitats")
            .send({
                habitatName: "Habitat to Delete"
            });

        const habitatID = createResponse.body.habitatID;

        const response = await request(app)
            .delete(`/api/habitats/${habitatID}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("message", "Habitat deleted");
    });

    // ===== BIRDIMAGES TESTS =====

    test("POST /api/birdimages should create a new bird image", async () => {
        const response = await request(app)
            .post("/api/birdimages")
            .send({
                birdID: 1,
                imagePath: "/images/test.jpg",
                isMainImage: 1
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("message", "Image created");
        expect(response.body).toHaveProperty("imageID");
    });

    test("POST /api/birdimages should fail without required fields", async () => {
        const response = await request(app)
            .post("/api/birdimages")
            .send({
                birdID: 1
            });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    test("PUT /api/birdimages/:id should update a bird image", async () => {
        const createResponse = await request(app)
            .post("/api/birdimages")
            .send({
                birdID: 1,
                imagePath: "/images/original.jpg",
                isMainImage: 1
            });

        const imageID = createResponse.body.imageID;

        const response = await request(app)
            .put(`/api/birdimages/${imageID}`)
            .send({
                imagePath: "/images/updated.jpg",
                isMainImage: 0
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("message", "Image updated");
    });

    test("DELETE /api/birdimages/:id should delete a bird image", async () => {
        const createResponse = await request(app)
            .post("/api/birdimages")
            .send({
                birdID: 1,
                imagePath: "/images/delete.jpg",
                isMainImage: 0
            });

        const imageID = createResponse.body.imageID;

        const response = await request(app)
            .delete(`/api/birdimages/${imageID}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("message", "Image deleted");
    });

    // ===== THREADS/POSTS TESTS =====

    test("PUT /api/threads/:id should update a thread", async () => {
        const createResponse = await request(app)
            .post("/api/threads")
            .send({
                threadTitle: "Original Title",
                userName: "Tester",
                postText: "First post"
            });

        const threadID = createResponse.body.threadID;

        const response = await request(app)
            .put(`/api/threads/${threadID}`)
            .send({
                threadTitle: "Updated Title"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("message", "Thread updated");
    });

    test("DELETE /api/threads/:id should delete a thread and all posts", async () => {
        const createResponse = await request(app)
            .post("/api/threads")
            .send({
                threadTitle: "Thread to Delete",
                userName: "Tester",
                postText: "Post to delete"
            });

        const threadID = createResponse.body.threadID;

        const response = await request(app)
            .delete(`/api/threads/${threadID}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("message", "Thread and all its posts deleted");
    });

    test("PUT /api/threads/:id/posts/:postId should update a post", async () => {
        const threadResponse = await request(app)
            .post("/api/threads")
            .send({
                threadTitle: "Thread for post update",
                userName: "User1",
                postText: "Original post text"
            });

        const threadID = threadResponse.body.threadID;

        const postResponse = await request(app)
            .post(`/api/threads/${threadID}/posts`)
            .send({
                userName: "User2",
                postText: "Reply text"
            });

        const postID = postResponse.body.postID;

        const response = await request(app)
            .put(`/api/threads/${threadID}/posts/${postID}`)
            .send({
                postText: "Updated reply text"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("message", "Post updated");
    });

    test("DELETE /api/threads/:id/posts/:postId should delete a post", async () => {
        const threadResponse = await request(app)
            .post("/api/threads")
            .send({
                threadTitle: "Thread for post delete",
                userName: "User1",
                postText: "Original post"
            });

        const threadID = threadResponse.body.threadID;

        const postResponse = await request(app)
            .post(`/api/threads/${threadID}/posts`)
            .send({
                userName: "User2",
                postText: "Post to delete"
            });

        const postID = postResponse.body.postID;

        const response = await request(app)
            .delete(`/api/threads/${threadID}/posts/${postID}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("message", "Post deleted");
    });

    test("DELETE /api/threads/999999/posts/999999 should return 404", async () => {
        const response = await request(app)
            .delete("/api/threads/999999/posts/999999");

        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("error", "Post not found");
    });
});