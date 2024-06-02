const { getCatById, getAllBreeds, editCat, checkCatId } = require("../services/data");
const { delImg } = require("../services/images");

async function showEditForm(req, res) {
    let id = req.params.id;
    let isValid = await checkCatId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    let cat = await getCatById(id).lean();
    let breeds = await getAllBreeds().lean();
    let breed = breeds.find(el => el.breedName == cat.breed);
    let index = breeds.indexOf(breed);
    breeds.splice(index, 1);
    res.render("editCats", { vars: { cat, breeds } });
}

async function onEdit(req, res) {
    let id = req.params.id;
    let isValid = await checkCatId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    let cat = await getCatById(id).lean();
    let data = req.body;
    let errors = {
        name: !data.name,
        description: !data.description,
        breed: !data.breed
    }
    let imgURLArr = cat.imgURL.split("\\");
    let imgToDel = imgURLArr[imgURLArr.length - 1];
    if (req.file) {
        let imgFile = req.file;
        let imgPath = imgFile.path;
        data["imgURL"] = "\\" + imgPath;

    }
    if (Object.values(errors).includes(true)) {
        let breeds = await getAllBreeds().lean();
        res.render("editCats", { vars: { cat, breeds }, errors });
        return;
    }
    await editCat(id, data);
    if (imgToDel) {
        await delImg(imgToDel);
    }
    res.redirect("/");
}

module.exports = {
    showEditForm,
    onEdit
}