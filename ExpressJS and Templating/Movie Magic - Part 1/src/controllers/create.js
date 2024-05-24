const { createMovie } = require("../services/dataService");

function showCreateForm(req, res) {
    res.render("create");
}

async function onCreate(req, res) {
    let data = req.body;
    await createMovie(data);
    res.redirect("/");
}

module.exports = {
    showCreateForm,
    onCreate
}