const express = require("express");
const Database = require("better-sqlite3");
const path = require("path");

const router = express.Router();
const db = new Database(path.join(__dirname, "birdlexicon.db"));

router.get("/", (req,res)=>{ // "/api/threads"
    //MAX(ForumPost.DateCreated) holt das letzte Post‑Datum je Thread
    //LEFT JOIN stellt sicher, dass Threads ohne Posts trotzdem kommen (dann ist LastPostDate null)
    const threads = db.prepare(`
    SELECT
        ForumThread.ThreadID,
        ForumThread.ThreadTitle,
        MAX(ForumPost.DateCreated) AS LastPostDate
    FROM ForumThread
    LEFT JOIN ForumPost
        ON ForumPost.ThreadID = ForumThread.ThreadID
    GROUP BY ForumThread.ThreadID, ForumThread.ThreadTitle
    ORDER BY ForumThread.ThreadID DESC
    `).all();

    res.json(threads);
});

router.get("/:id", (req,res) => { // "/api/threads/:id"
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

    //post tree bauen: jeder Post kann mehrere Children-Posts haben
    const postMap = new Map(); // Map ist eine Datenstruktur, die Key:Value Paare speichert -> schnelle Suche nach Key ; Der KEY ist hier die PostID, der VALUE ist das komplette Post-Objekt
    for (const post of posts) { //Wir gehen jeden Post aus der DB durch (posts ist das flache Array)
        //Wir legen ihn in die Map, damit wir ihn später per PostID finden können
        //Wir fügen direkt Children: [] hinzu, damit jeder Post später Kinder speichern kann
        postMap.set(post.PostID, { ...post, Children: [] }); 
        //Ergebnis: postMap enthält alle Posts, schnell zugreifbar über PostID
    }

    const rootPosts = [];
    for (const post of postMap.values()) { //alle Posts aus der Map durchgehen
        if (post.ParentID && postMap.has(post.ParentID)) { //falls ein Post eine ParentID hat, suchen wir den Elternpost in der Map und haengen den aktuellen Post an dessen Children.
            postMap.get(post.ParentID).Children.push(post); 
        } else { // falls kein ParentID da ist, ist es ein Root-Post und kommt in rootPosts, da sind die obersten Posts drin
            rootPosts.push(post);
        }
    }

    res.json({
        ...thread, // kopiert alle Eigenschaften des thread-Objekts mit dem Objekt-Spread-Operator ("...thread")
        posts: rootPosts //added eine Eigenschaft mit KEY:posts und VALUE:<rootPosts>(der geschachtelte post-tree)
    });
});

router.post("/", (req, res) => { // "/api/threads"
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

router.post("/:id/posts", (req, res) => { // "/api/threads/:id/posts"
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


module.exports = router;