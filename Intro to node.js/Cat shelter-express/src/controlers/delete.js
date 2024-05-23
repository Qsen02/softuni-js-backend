const { getCatById, deleteCat } = require("../services/dataService");

async function showDeleteFrom(req, res) {
    let id = req.params.id;
    let cat = await getCatById(id);
    res.render("deleteCat", { cat });
}

async function onDelete(req, res) {
    let id = req.params.id;
    await deleteCat(id);
    res.redirect("/");
}

module.exports = {
    showDeleteFrom,
    onDelete
}