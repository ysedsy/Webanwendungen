const express = require("express");
const Database = require("better-sqlite3");
const path = require("path");

const router = express.Router();
const db = new Database(path.join(__dirname, "birdlexicon.db"));

// ------ READ ALL ------
router.get("/", (req,res) => {
    // alle Images aus DB holen und in images packen
    const images = db.prepare(`SELECT ImageID, BirdID, ImagePath, IsMainImage FROM BirdImage`).all();

    // images als json zurueckgeben
    res.json(images);
});

// ------ READ ONE ------
router.get("/:id", (req,res) => {
    // Image aus DB holen und in images packen
    const image = db.prepare(`SELECT ImageID, BirdID, ImagePath, IsMainImage
         FROM BirdImage WHERE ImageID = ?`).get(req.params.id);

    // falls image Objekt leer ist -> Fehler, Bild existiert nicht
    if (!image){
        return res.status(404).json({error: "Image not found"});
    }

    // image als json zurueckgeben
    res.json(image);
});

// ------ CREATE ------
router.post("/", (req, res) => {
    // 1. Daten aus req.body extrahieren
    const { birdID, imagePath, isMainImage } = req.body;

    // 2. Pruefen ob die erforderlichen Felder 'birdID' und 'ImagePath' da sind
    if (!birdID || !imagePath || !isMainImage) {
        return res.status(400).json({error: "some required Attributes are missing"});
    }

    // 3. Insert machen
    const result = db.prepare(`
        INSERT INTO BirdImage (BirdID, ImagePath, IsMainImage) VALUES(?, ?, ?)`)
        .run(birdID, imagePath, isMainImage ? 1 : 0);

    // 4. Erfolg mit neuer ID zurueckgeben
    res.status(201).json({
        message: "Image created",
        imageID: result.lastInsertRowid
    })
});

// ------ UPDATE ------
router.put("/:id", (req, res) => { 
    // 1. Daten aus Body extrahieren
    const {imagePath, isMainImage} = req.body

    // 2. Pruefen, ob Eintrag existiert
    const image = db.prepare(`SELECT ImageID FROM BirdImage WHERE ImageID = ?`).get(req.params.id);
    if(!image){ // falls image nicht existiert -> Error
        return res.status(404).json({error: "Image not found"});
    }

    //3. Update ausfuehren
    db.prepare(`UPDATE BirdImage SET ImagePath = ?, IsMainImage = ? WHERE ImageID = ?`).run(imagePath, isMainImage ? 1 : 0, req.params.id);
    // Bsp-SQL mit eingesetzten Werten:
    // UPDATE BirdImage SET ImagePath = '/images/eagle.jpg', IsMainImage = 1 WHERE ImageID = 5

    // 4. Erfolg  zurueckmelden
    res.json({message: "Image updated"});
});

// ------ DELETE ------
router.delete("/:id", (req, res) => {
    // 1. Pruefen ob Eintrag existiert
    const image = db.prepare(`SELECT ImageID FROM BirdImage WHERE ImageID = ?`).get(req.params.id);
    if(!image){ // falls image nicht existiert -> Error
        return res.status(404).json({error: "Image not found"});
    }

    // 2. Eintrag Loeschen
    db.prepare(`DELETE FROM BirdImage WHERE ImageID = ?`).run(req.params.id);

    // 3. Erfolg  zurueckmelden
    res.json({ message: "Image deleted" });

});


module.exports = router;
