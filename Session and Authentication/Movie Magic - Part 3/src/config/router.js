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
const { showEditForm, onEdit } = require("../controllers/edit");
const { isGuest, isUser } = require("../middlewears/guards");

let router = Router();

router.get("/", showHome);
router.get("/about", showAbout);
router.get("/details/:id", showDetails);
router.get("/create", isUser(), showCreateForm);
router.post("/create", isUser(), onCreate);
router.get("/searcher", showSerchMenu);
router.get("/search?*", onSearch);
router.get("/cast/create", isUser(), showCastForm);
router.post("/cast/create", isUser(), onCreateCast);
router.get("/movies/:id/attach", isUser(), showAttachForm);
router.post("/movies/:id/attach", isUser(), onAttach);
router.get("/movies/:id/delete", isUser(), showDeleteForm);
router.get("/movies/:id/delete/yes", isUser(), onDelete);
router.get("/movies/:id/delete/no", isUser(), onRefuse);
router.get("/register", isGuest(), showRegisterForm);
router.post("/register", isGuest(), onRegister);
router.get("/movies/:id/edit", isUser(), showEditForm);
router.post("/movies/:id/edit", isUser(), onEdit);
router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
});
router.get("/login", isGuest(), showLoginForm);
router.post("/login", isGuest(), onLogin);
router.get("*", (req, res) => {
    res.render("error");
})

module.exports = { router }