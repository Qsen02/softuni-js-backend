const { catalogRouter } = require("../controllers/catalog");
const { userRouter } = require("../controllers/user");

function routerConfig(app) {
    app.use("/users", userRouter);

    app.use("/data/catalog", catalogRouter);

    app.get("*", (req, res) => {
        res.status(404).json({ message: "Page not found!" });
    })
}

module.exports = {
    routerConfig
}