const { showHome } = require("../controllers/home");

function routerConfig(app) {
    app.get("/", showHome);

    app.get("*", (req, res) => {
        res.render("404");
    })
}

module.exports = {
    routerConfig
}