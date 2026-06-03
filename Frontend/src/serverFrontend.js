const express = require("express");
const path = require ("path");


const app = express();
const port = 4000;

app.use(express.json())
app.use(express.static(path.join(__dirname, "../public")))

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

module.exports = app;