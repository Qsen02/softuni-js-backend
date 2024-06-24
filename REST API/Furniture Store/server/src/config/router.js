const { catalogRouter } = require("../controllers/catalog");

function routerConfig(app) {
    app.use("/data/catalog", catalogRouter);

    app.get("*", (req, res) => {
        res.status(404).json({ message: "Page not found!" });
    })
}

module.exports = {
    routerConfig
}