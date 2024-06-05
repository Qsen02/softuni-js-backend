const { Router } = require("express");
let { showHome, showAbout } = require("../controllers/home");
const { showDetails } = require("../controllers/details");
const { showCreateForm, onCreate } = require("../controllers/create");
const { showSerchMenu, onSearch } = require("../controllers/search");
const { showCastForm, onCreateCast } = require("../controllers/createCast");
const { showAttachForm, onAttach } = require("../controllers/attach");
const { onDelete, showDeleteForm, onRefuse } = require("../controllers/deleteMovie");
const { showRegisterForm, onRegister } = require("../controllers/register");
const { showLoginForm, onLogin } = require("../controllers/login");

let router = Router();

router.get("/", showHome);
router.get("/about", showAbout);
router.get("/details/:id", showDetails);
router.get("/create", showCreateForm);
router.post("/create", onCreate);
router.get("/searcher", showSerchMenu);
router.get("/search?*", onSearch);
router.get("/cast/create", showCastForm);
router.post("/cast/create", onCreateCast);
router.get("/movies/:id/attach", showAttachForm);
router.post("/movies/:id/attach", onAttach);
router.get("/movies/:id/delete", showDeleteForm);
router.get("/movies/:id/delete/yes", onDelete);
router.get("/movies/:id/delete/no", onRefuse);
router.get("/register", showRegisterForm);
router.post("/register", onRegister);
router.get("/logout", (req, res) => {
    delete req.session.user;
    res.redirect("/");
});
router.get("/login", showLoginForm);
router.post("/login", onLogin);
router.get("*", (req, res) => {
    res.render("error");
})

module.exports = { router }