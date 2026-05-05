const express = require("express");
const Database = require("better-sqlite3");

const app = express();
const port = 3000;

const db = new Database("C:\\Users\\thorb\\OneDrive\\Dokumente\\02_Hochschule\\04_Module\\4_Semester\\07_Web Anwendungen 2\\02_Praktikum\\birdlexicon.db");

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