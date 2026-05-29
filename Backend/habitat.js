const express = require("express");
const Database = require("better-sqlite3");
const path = require("path");

const router = express.Router();
const db = new Database(path.join(__dirname, "birdlexicon.db"));

// --- Read All ---
router.get("/", (req,res) => { // "/api/habitats"
    const habitats = db.prepare(`
    SELECT
        HabitatID,
        HabitatName
    FROM Habitat
    `).all();

    res.json(habitats);
});

// --- Read One ---
router.get("/:id", (req, res) => { // "/api/habitats/:id"
    const habitat = db.prepare(`
    SELECT
        HabitatID,
        HabitatName
    FROM Habitat
    WHERE HabitatID = ?
    `).get(req.params.id);

    if (!habitat) {
        return res.status(404).json({ error: "Habitat not found" });
    }

    res.json(habitat);
});

// --- Create ---
router.post("/", (req, res) => { // "/api/habitats"
    const { habitatName } = req.body;

    if (!habitatName) {
        return res.status(400).json({ error: "habitatName is required" });
    }

    const result = db.prepare(`
        INSERT INTO Habitat (HabitatName)
        VALUES(?)
    `).run(habitatName);

    res.status(201).json({
        message: "Habitat created",
        habitatID: result.lastInsertRowid
    });
});

// --- Update ---
router.put("/:id", (req, res) => { // "/api/habitats/:id"
    const { habitatName } = req.body;

    const habitat = db.prepare(`
        SELECT HabitatID FROM Habitat WHERE HabitatID = ?
    `).get(req.params.id);

    if (!habitat) {
        return res.status(404).json({ error: "Habitat not found" });
    }

    db.prepare(`
        UPDATE Habitat
        SET HabitatName = ?
        WHERE HabitatID = ?
    `).run(habitatName, req.params.id);

    res.json({ message: "Habitat updated" });
});

// --- Delete ---
router.delete("/:id", (req, res) => { // "/api/habitats/:id"
    const habitat = db.prepare(`
        SELECT HabitatID FROM Habitat WHERE HabitatID = ?
    `).get(req.params.id);

    if (!habitat) {
        return res.status(404).json({ error: "Habitat not found" });
    }

    db.prepare(`DELETE FROM Habitat WHERE HabitatID = ?`).run(req.params.id);

    res.json({ message: "Habitat deleted" });
});

module.exports = router;