const { createBreed } = require("../services/dataService");

function showBreedForm(req, res) {
    res.render("addBreed");
}

async function onCreate(req, res) {
    let data = req.body;
    await createBreed(data);
    res.redirect("/");
}

module.exports = {
    showBreedForm,
    onCreate
}