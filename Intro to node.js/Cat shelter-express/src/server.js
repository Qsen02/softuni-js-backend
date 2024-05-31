let express = require("express");
const { confingHbs } = require("./config/hbs");
const { configExpress } = require("./config/express");
const { router } = require("./config/router");
const { start } = require("./config/mongoose");

async function main() {
    await start();
    let app = express();
    confingHbs(app);
    configExpress(app);

    app.use(router);

    app.listen(3000, () => console.log("Server is listening"));
}

main();