const express = require("express");
const Database = require("better-sqlite3");
const path = require("path");

const router = express.Router();
const db = new Database(path.join(__dirname, "birdlexicon.db"));



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


module.exports = router;