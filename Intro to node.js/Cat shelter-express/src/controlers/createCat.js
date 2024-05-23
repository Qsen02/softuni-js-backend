const { getAllBreeds, createCat } = require("../services/dataService");

async function showCreateForm(req, res) {
    let breeds = await getAllBreeds();
    res.render("addCat", { breeds });
}

async function onCreateCat(req, res) {
    let data = req.body;
    if (data.description && data.breed && data.name) {
        await createCat(data);
    }
    res.redirect("/");
}

module.exports = {
    showCreateForm,
    onCreateCat
}