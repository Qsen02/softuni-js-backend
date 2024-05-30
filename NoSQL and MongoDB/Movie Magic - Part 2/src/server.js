const express = require("express");
const { router } = require("./config/router");
const { hbsConfig } = require("./config/handelbars");
const { expressConfig } = require("./config/express");
const { main } = require("./config/mongoose");

main();
let app = express();
hbsConfig(app);
expressConfig(app);

app.use(router);

app.listen(3000);