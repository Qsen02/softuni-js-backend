const express = require("express");
const handlebars = require("express-handlebars");
let { showHome, showAbout } = require("./controllers/home");
const { showDetails } = require("./controllers/details");
const { showCreateForm, onCreate } = require("./controllers/create");
const { showSerchMenu, onSearch } = require("./controllers/search");

let app = express();
let hbs = handlebars.create({ extname: ".hbs" });
app.set("view engine", ".hbs");
app.engine(".hbs", hbs.engine);

app.use("/static", express.static("static"));
app.use(express.urlencoded({ extended: true }));

app.get("/", showHome);
app.get("/about", showAbout);
app.get("/details/:id", showDetails);
app.get("/create", showCreateForm);
app.post("/create", onCreate);
app.get("/search", showSerchMenu);
app.post("/search", onSearch);
app.get("*", (req, res) => {
    res.render("error");
})

app.listen(3000);