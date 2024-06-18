const { courseRouter } = require("../controllers/course");
const { homeRouter } = require("../controllers/home");
const { userRouter } = require("../controllers/user");

function routerConfig(app) {
    app.use(courseRouter);

    app.use(userRouter);

    app.use(homeRouter);

    app.get("*", (req, res) => {
        req.title = "404 page";
        res.render("404", { title });
    })
}

module.exports = {
    routerConfig
}