const express = require("express");
const Database = require("better-sqlite3");
const path = require("path");

const router = express.Router();
const db = new Database(path.join(__dirname, "birdlexicon.db"));


// ------ READ ALL ------
router.get("/", (req, res) => { // /api/birds
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

// ------ READ ONE ------
router.get("/:id", (req, res)=>{ // /api/birds/:id
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


router.get("/search/:keyword", (req, res) => { // "/api/birds/search/:keyword"
  const keyword = req.params.keyword || "";
  // Fuzzy search: case-insensitive, match anywhere in the name
  const like = `%${keyword}%`;

  const stmt = db.prepare(`
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
    WHERE LOWER(Bird.CommonName) LIKE LOWER(?)
    ORDER BY Bird.CommonName
    LIMIT 100
  `);

  const birds = stmt.all(like); 

  if (!birds || birds.length === 0) {
    return res.status(404).json({ error: "No birds found" });
  }

  res.json(birds);
});

// ------ CREATE ------
router.post("/", (req, res) => {
  // 1. Daten aus req.body extrahieren
  const {commonName, scientificName, height, weight, habitatID, averageAge, description } = req.body

  // 2. Validierung
  if (!commonName || !scientificName || !height || !weight || !habitatID || !averageAge || !description){
    return res.status(400).json({error: "some required Attributes are missing"});
  }

  // 3. Insert machen
  const result = db.prepare(`
        INSERT INTO Bird (CommonName, ScientificName, Height, Weight, HabitatID, AverageAge, Description)
        VALUES(?, ?, ?, ?, ?, ?, ?)
    `).run(commonName, scientificName, height || null, weight || null, habitatID, averageAge || null, description || null);
    
    res.status(201).json({
        message: "Bird created",
        birdID: result.lastInsertRowid
    });
});

// ------ UPDATE ------
router.put("/:id", (req, res) => {
    // 1. Daten aus Body (nur die, die der User aendern will)
    const { commonName, scientificName, height, weight, habitatID, averageAge, description } = req.body;
    
    // 2. Pruefen ob Bird existiert
    const bird = db.prepare(`SELECT BirdID FROM Bird WHERE BirdID = ?`).get(req.params.id);
    if (!bird) {
        return res.status(404).json({ error: "Bird not found" });
    }
    
    // 3. UPDATE
    db.prepare(`
        UPDATE Bird 
        SET CommonName = ?, ScientificName = ?, Height = ?, Weight = ?, HabitatID = ?, AverageAge = ?, Description = ?
        WHERE BirdID = ?
    `).run(commonName, scientificName, height, weight, habitatID, averageAge, description, req.params.id);
    
    res.json({ message: "Bird updated" });
});

// ------ DELETE ------
router.delete("/:id", (req, res) => {
    // 1. Pruefen ob existiert
    const bird = db.prepare(`SELECT BirdID FROM Bird WHERE BirdID = ?`).get(req.params.id);
    if (!bird) {
        return res.status(404).json({ error: "Bird not found" });
    }
    
    // 2. DELETE
    db.prepare(`DELETE FROM Bird WHERE BirdID = ?`).run(req.params.id);
    
    res.json({ message: "Bird deleted" });
});

module.exports = router;