const express = require("express");
const Database = require("better-sqlite3");
const path = require ("path");
const swaggerUi = require("swagger-ui-express");
const YAML = require("js-yaml");
const fs = require("fs");

// Router importieren
const birdsRouter = require("./birds");
const habitatRouter = require("./habitat");
const threadRouter = require("./threads");

const app = express();
const port = 3000;

app.use(express.json())
app.use(express.static(path.join(__dirname, "../Frontend")))

const db = new Database(path.join(__dirname, "birdlexicon.db"));

// Load and setup Swagger documentation
const swaggerDocument = YAML.load(fs.readFileSync(path.join(__dirname, "openapi.yaml"), "utf8"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/api", (req,res) => {
    res.send("Bird Lexicon API is running");
});

//Router registrieren
app.use("/api/birds",birdsRouter)
app.use("/api/habitats",habitatRouter)
app.use("/api/threads",threadRouter)


if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

module.exports = app;