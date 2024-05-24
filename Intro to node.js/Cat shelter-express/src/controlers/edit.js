const { getCatById, getAllBreeds, editCat } = require("../services/dataService");

async function showEditForm(req, res) {
    let id = req.params.id;
    let cat = await getCatById(id);
    if (!cat) {
        res.render("404");
        return;
    }
    let breeds = await getAllBreeds();
    let breed = breeds.find(el => el.breedName == cat.breed);
    let index = breeds.indexOf(breed);
    breeds.splice(index, 1);
    res.render("editCats", { vars: { cat, breeds } });
}

async function onEdit(req, res) {
    let id = req.params.id;
    let data = req.body;
    await editCat(id, data);
    res.redirect("/");
}

module.exports = {
    showEditForm,
    onEdit
}