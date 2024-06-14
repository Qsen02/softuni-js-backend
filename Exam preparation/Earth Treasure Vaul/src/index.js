let express = require("express");
const { expressConfig } = require("./config/express");
const { hbsConfig } = require("./config/handlebars");
const { runDatabase } = require("./config/mongoose");
const { routerConfig } = require("./config/router");

let app = express();

async function start() {
    await runDatabase();

    expressConfig(app);
    hbsConfig(app);

    routerConfig(app);

    app.listen(3000, () => console.log("Server is listening on port 3000..."));
}
start();