const { homeRouter } = require("../controllers/home");
const { userRouter } = require("../controllers/user");
const { volcanoRouter } = require("../controllers/volcano");

function routerConfig(app) {
    app.use(volcanoRouter);

    app.use(userRouter);

    app.use(homeRouter);

    app.get("*", (req, res) => {
        res.render("404");
    })
}

module.exports = {
    routerConfig
}