const express = require("express");
const Database = require("better-sqlite3");
const path = require ("path");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")))

const db = new Database(path.join(__dirname, "birdlexicon.db"));

app.get("/", (req,res) => {
    res.send("Bird Lexicon API is running");
});

app.get("/birds", (req, res) => {
    const birds = db.prepare(
        `SELECT
            Bird.BirdID,
            Bird.CommonName,
            Bird.ScientificName,
            Habitat.HabitatName,
            BirdImage.ImagePath
        FROM Bird
        JOIN Habitat ON Bird.HabitatID = Habitat.HabitatID
        LEFT JOIN BirdImage ON Bird.BirdID = BirdImage.BirdID
        AND BirdImage.IsMainImage = 1`
    ).all();

    res.json(birds);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})