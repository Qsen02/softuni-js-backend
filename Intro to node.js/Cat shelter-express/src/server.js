let express = require("express");
const { confingHbs } = require("./config/hbs");
const { configExpress } = require("./config/express");
const { router } = require("./config/router");

let app = express();
confingHbs(app);
configExpress(app);

app.use(router);

app.listen(3000);