const { getAllBreeds, createCat } = require("../services/data");

async function showCreateForm(req, res) {
    let breeds = await getAllBreeds().lean();
    res.render("addCat", { breeds });
}

async function onCreateCat(req, res) {
    const fields = req.body;
    console.log(fields);
    let errors = {
        name: !fields.name,
        description: !fields.description,
        breed: !fields.breed
    }
    let name = fields.name;
    let description = fields.description;
    let breed = fields.breed;
    let imgFile = "";
    let imgPath = "";

    if (req.file) {
        imgFile = req.file;
        imgPath = imgFile.path;
    }

    if (Object.values(errors).includes(true)) {
        console.log(Object.values(errors))
        let breeds = await getAllBreeds().lean();
        res.render("addCat", { cats: req.body, errors, breeds });
        return;
    }
    await createCat({ name, description, imgURL: "\\" + imgPath, breed });
    res.redirect("/");
}

module.exports = {
    showCreateForm,
    onCreateCat
}