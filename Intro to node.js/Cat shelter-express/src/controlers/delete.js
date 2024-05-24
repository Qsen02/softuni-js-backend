const { getCatById, deleteCat } = require("../services/dataService");

async function showDeleteFrom(req, res) {
    let id = req.params.id;
    let cat = await getCatById(id);
    if (!cat) {
        res.render("404");
        return;
    }
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