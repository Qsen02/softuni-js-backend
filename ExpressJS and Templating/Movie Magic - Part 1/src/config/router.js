const { Router } = require("express");
let { showHome, showAbout } = require("../controllers/home");
const { showDetails } = require("../controllers/details");
const { showCreateForm, onCreate } = require("../controllers/create");
const { showSerchMenu, onSearch } = require("../controllers/search");

let router = Router();

router.get("/", showHome);
router.get("/about", showAbout);
router.get("/details/:id", showDetails);
router.get("/create", showCreateForm);
router.post("/create", onCreate);
router.get("/searcher", showSerchMenu);
router.get("/search?*", onSearch);
router.get("*", (req, res) => {
    res.render("error");
})

module.exports = { router }