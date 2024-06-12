let { showHome, showAbout } = require("../controllers/home");
const { showDetails } = require("../controllers/details");
const { showSerchMenu, onSearch } = require("../controllers/search");
const { userRouter } = require("../controllers/users");
const { movieRouter } = require("../controllers/movies");
const { castRouter } = require("../controllers/casts");

function configRouter(app) {
    app.get("/", showHome);
    app.get("/about", showAbout);
    app.get("/details/:id", showDetails);
    app.get("/searcher", showSerchMenu);
    app.get("/search?*", onSearch);

    app.use(castRouter);

    app.use(movieRouter);

    app.use(userRouter);

    app.get("*", (req, res) => {
        res.render("error");
    })

}

module.exports = { configRouter }