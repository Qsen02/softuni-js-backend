const { getAllBreeds, createCat } = require("../services/data");
const path = require("path");

async function showCreateForm(req, res) {
    let breeds = await getAllBreeds();
    res.render("addCat", { breeds });
}

async function onCreateCat(req, res) {
    const fields = req.body;
    let name = fields.name;
    let description = fields.description;
    let breed = fields.breed;
    let imgFile = "";
    let imgPath = "";

    if (req.file) {
        imgFile = req.file;
        imgPath = imgFile.path;
    }

    if (name && description) {
        await createCat({ name, description, imgURL: "\\" + imgPath, breed });
    }
    res.redirect("/");
}

module.exports = {
    showCreateForm,
    onCreateCat
}