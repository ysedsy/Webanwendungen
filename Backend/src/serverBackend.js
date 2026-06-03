const express = require("express");
const Database = require("better-sqlite3");
const path = require ("path");
const swaggerUi = require("swagger-ui-express");
const YAML = require("js-yaml");
const fs = require("fs");

// Router importieren
const birdsRouter = require("./routes/birds");
const habitatRouter = require("./routes/habitat");
const threadRouter = require("./routes/threads");
const birdImagesRouter = require("./routes/birdimages");

const app = express();
const port = 3000;

app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(path.join(__dirname, "../../Frontend")))
app.use("/images", express.static(path.join(__dirname, "public/images")))
app.use("/logos", express.static(path.join(__dirname, "public/logos")))

const db = new Database(path.join(__dirname, "database/birdlexicon.db"));

// CORS HEADER wegen Trennung Frontend / Backend Seerver!
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:4000' }));


// Load and setup Swagger documentation
const swaggerDocument = YAML.load(fs.readFileSync(path.join(__dirname, "docs/openapi.yaml"), "utf8"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/api", (req,res) => {
    res.send("Bird Lexicon API is running");
});

//Router registrieren
app.use("/api/birds",birdsRouter)
app.use("/api/habitats",habitatRouter)
app.use("/api/threads",threadRouter)
app.use("/api/birdimages",birdImagesRouter)



if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

module.exports = app;