const { createMovie } = require("../services/dataService");

function showCreateForm(req, res) {
    res.render("create");
}

function onCreate(req, res) {
    let data = req.body;
    createMovie(data);
    res.redirect("/");
}

module.exports = {
    showCreateForm,
    onCreate
}