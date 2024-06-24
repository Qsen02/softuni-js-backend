const express = require("express");
const { expressConfig } = require("./config/express");
const { routerConfig } = require("./config/router");
const { runDB } = require("./config/mongoose");

const app = express();

async function start() {
    await runDB();

    expressConfig(app);

    routerConfig(app);

    app.listen(3030, () => console.log("Server is listening on http://localhost:3030"));
}

start();