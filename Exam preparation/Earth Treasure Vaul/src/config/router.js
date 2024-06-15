const { homeRouter } = require("../controllers/home");
const { showSearchPage, onSearch } = require("../controllers/search");
const { stonesRouter } = require("../controllers/stones");
const { userRouter } = require("../controllers/user");


function routerConfig(app) {
    app.get("/stones/search", showSearchPage);
    app.get("/search?*", onSearch);
    app.use(stonesRouter);

    app.use(homeRouter);

    app.use(userRouter);

    app.get("*", (req, res) => {
        res.render("404");
    })
}

module.exports = {
    routerConfig
}