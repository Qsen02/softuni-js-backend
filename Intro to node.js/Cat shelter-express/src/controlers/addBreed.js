const { createBreed } = require("../services/data");

function showBreedForm(req, res) {
    res.render("addBreed");
}

async function onCreate(req, res) {
    let data = req.body;
    let error = false;
    if (!data.breedName) {
        error = true;
        res.render("addBreed", { error });
        return;
    }
    await createBreed(data);
    res.redirect("/");
}

module.exports = {
    showBreedForm,
    onCreate
}