const express = require("express");
const Database = require("better-sqlite3");
const path = require("path");

const router = express.Router();
const db = new Database(path.join(__dirname, "birdlexicon.db"));

router.get("/", (req,res) => { // "/api/habitats"
    const habitats = db.prepare(`
    SELECT
        HabitatID,
        HabitatName
    FROM Habitat
    `).all();

    res.json(habitats);
});


module.exports = router;