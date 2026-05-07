const express = require("express");
const Database = require("better-sqlite3");
const path = require ("path");

const app = express();
const port = 3000;

app.use(express.json())
app.use(express.static(path.join(__dirname, "../Frontend")))

const db = new Database(path.join(__dirname, "birdlexicon.db"));

app.get("/api", (req,res) => {
    res.send("Bird Lexicon API is running");
});

app.get("/api/birds", (req, res) => {
    const birds = db.prepare(
        `SELECT
            Bird.BirdID,
            Bird.CommonName,
            Bird.ScientificName,
            Bird.Height,
            Bird.Weight,
            Bird.AverageAge,
            Bird.Description,
            Habitat.HabitatID,
            Habitat.HabitatName,
            BirdImage.ImagePath
        FROM Bird
        JOIN Habitat ON Bird.HabitatID = Habitat.HabitatID
        LEFT JOIN BirdImage 
            ON Bird.BirdID = BirdImage.BirdID
            AND BirdImage.IsMainImage = 1`
    ).all();

    res.json(birds);
});

app.get("/api/birds/:id", (req, res)=>{
    const bird = db.prepare(`
    SELECT
        Bird.BirdID,
        Bird.CommonName,
        Bird.ScientificName,
        Bird.Height,
        Bird.Weight,
        Bird.AverageAge,
        Bird.Description,
        Habitat.HabitatID,
        Habitat.HabitatName,
        BirdImage.ImagePath
    FROM Bird
    JOIN Habitat ON Bird.HabitatID = Habitat.HabitatID
    LEFT JOIN BirdImage
        ON Bird.BirdID = BirdImage.BirdID
        AND BirdImage.IsMainImage = 1
    WHERE Bird.BirdID = ?
    `).get(req.params.id);

    if(!bird){
        return res.status(404).json({ error: "Bird not found" });
    }

    res.json(bird);
});

app.get("/api/habitats", (req,res) => {
    const habitats = db.prepare(`
    SELECT
        HabitatID,
        HabitatName
    FROM Habitat
    `).all();

    res.json(habitats);
});

app.get("/api/threads", (req,res)=>{
    const threads = db.prepare(`
    SELECT
        ThreadID,
        ThreadTitle
    FROM ForumThread
    ORDER BY ThreadID DESC
    `).all();

    res.json(threads);
});

app.get("/api/threads/:id", (req,res) => {
    const thread = db.prepare(`
    SELECT
        ThreadID,
        ThreadTitle
    FROM ForumThread
    WHERE ThreadID = ?
    `).get(req.params.id);

    if (!thread) {
        return res.status(404).json({ error: "Thread not found" });
    }

    const posts = db.prepare(`
    SELECT
        PostID,
        UserName,
        PostText,
        DateCreated,
        ThreadID,
        ParentID
    FROM ForumPost
    WHERE ThreadID = ?
    ORDER BY DateCreated ASC
    `).all(req.params.id);

    res.json({
        ...thread,
        posts
    });
});

app.post("/api/threads", (req, res) => {
    const { threadTitle, userName, postText } = req.body;

    if (!threadTitle || !postText){
        return res.status(400).json({ error: "threadTitle and postText are required"});
    }

    const insertThread = db.prepare(`
        INSERT INTO ForumThread (ThreadTitle)
        VALUES(?)
    `);

    const insertPost = db.prepare(`
        INSERT INTO ForumPost (UserName, PostText, ThreadID)
        VALUES(?, ?, ?)
    `);

    const transaction = db.transaction(() =>{
        const threadResult = insertThread.run(threadTitle);
        const threadID = threadResult.lastInsertRowid;

        insertPost.run(userName || "Anonymous", postText, threadID);

        return threadID;
    });

    const threadID = transaction();

    res.status(201).json({
        message: "Thread created",
        threadID
    });
});

app.post("/api/threads/:id/posts", (req, res) => {
    const { userName, postText, parentID } = req.body;

    if(!postText){
        return res.status(400).json({ error: "postText is required" });
    }

    const thread = db.prepare(`
        SELECT ThreadID FROM ForumThread WHERE ThreadID = ?
    `).get(req.params.id);

    if (!thread) {
        return res.status(404).json({ error: "Thread not found" });
    }

    const result = db.prepare(`
        INSERT INTO ForumPost (UserName, PostText, ThreadID, ParentID)
        VALUES(?, ?, ?, ?)
    `).run(
        userName || "Anonymous",
        postText,
        req.params.id,
        parentID || null
    );

    res.status(201).json({
        message: "Post created",
        postID: result.lastInsertRowid
    });
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

module.exports = app;