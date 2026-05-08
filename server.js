const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
const frontendDir = path.join(__dirname, "Frontend");

app.use(express.static(frontendDir));

app.get("/", (req, res) => {
    res.sendFile(path.join(frontendDir, "index.html"));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
