const { animalRouter } = require("../controllers/animals");
const { homeRouter } = require("../controllers/home");
const { userRouter } = require("../controllers/user");

function routerConfig(app) {
    app.use(animalRouter);

    app.use(userRouter);

    app.use(homeRouter);

    app.get("*", (req, res) => {
        res.render("404");
    })
}

module.exports = {
    routerConfig
}