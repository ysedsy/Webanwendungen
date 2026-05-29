const express = require("express");
const Database = require("better-sqlite3");
const path = require("path");

const router = express.Router();
const db = new Database(path.join(__dirname, "birdlexicon.db"));

// --- Read All Threads ---
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

// --- Read One Thread ---
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

// --- create Thread ---
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


// --- Update Thread ---
router.put("/:id", (req, res) => { // "/api/threads/:id"
    const { threadTitle } = req.body;
    
    // 1. Pruefe ob Thread existiert
    const thread = db.prepare(`
        SELECT ThreadID FROM ForumThread WHERE ThreadID = ?
    `).get(req.params.id);
    
    if (!thread) {
        return res.status(404).json({ error: "Thread not found" });
    }
    
    // 2. Update nur den Titel
    db.prepare(`
        UPDATE ForumThread
        SET ThreadTitle = ?
        WHERE ThreadID = ?
    `).run(threadTitle, req.params.id);
    
    res.json({ message: "Thread updated" });
});

// ------ Delete Thread ------
// WICHTIG!: zuerst alle Posts loeschen, dann den Thread! Sonst gibt es einen Foreign Key Constraint Error
router.delete("/:id", (req, res) => { // "/api/threads/:id"
    // 1. Pruefe ob Thread existiert
    const thread = db.prepare(`
        SELECT ThreadID FROM ForumThread WHERE ThreadID = ?
    `).get(req.params.id);
    
    if (!thread) {
        return res.status(404).json({ error: "Thread not found" });
    }
    
    // 2. WICHTIG: Erst alle Posts des Threads loeschen (wegen Foreign Key!)
    db.prepare(`
        DELETE FROM ForumPost WHERE ThreadID = ?
    `).run(req.params.id);
    
    // 3. Dann den Thread selbst loeschen
    db.prepare(`
        DELETE FROM ForumThread WHERE ThreadID = ?
    `).run(req.params.id);
    
    res.json({ message: "Thread and all its posts deleted" });
});





// --- Create Post ---
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

// --- UPDATE POST ---
router.put("/:id/posts/:postId", (req, res) => { // "/api/threads/:id/posts/:postId"
    const { postText } = req.body;
    
    // 1. Pruefe ob Post existiert UND zum Thread gehoert
    const post = db.prepare(`
        SELECT PostID FROM ForumPost 
        WHERE PostID = ? AND ThreadID = ?
    `).get(req.params.postId, req.params.id);
    
    if (!post) {
        return res.status(404).json({ error: "Post not found" });
    }
    
    // 2. Update den PostText
    db.prepare(`
        UPDATE ForumPost
        SET PostText = ?
        WHERE PostID = ?
    `).run(postText, req.params.postId);
    
    res.json({ message: "Post updated" });
});

// --- DELETE POST ---
router.delete("/:id/posts/:postId", (req, res) => { // "/api/threads/:id/posts/:postId"
    // 1. Pruefe ob Post existiert UND zum Thread gehoert
    const post = db.prepare(`
        SELECT PostID FROM ForumPost 
        WHERE PostID = ? AND ThreadID = ?
    `).get(req.params.postId, req.params.id);
    
    if (!post) {
        return res.status(404).json({ error: "Post not found" });
    }
    
    // 2. Delete den Post
    db.prepare(`
        DELETE FROM ForumPost WHERE PostID = ?
    `).run(req.params.postId);
    
    res.json({ message: "Post deleted" });
});

module.exports = router;