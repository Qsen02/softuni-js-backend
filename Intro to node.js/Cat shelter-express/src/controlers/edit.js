const { getCatById, getAllBreeds, editCat } = require("../services/data");
const { delImg } = require("../services/images");

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
    let cat = await getCatById(id);
    let data = req.body;
    let errors = {
        name: !data.name,
        description: !data.description,
        bree: !data.breed
    }
    let imgURLArr = cat.imgURL.split("\\");
    let imgToDel = imgURLArr[imgURLArr.length - 1];
    if (req.file) {
        let imgFile = req.file;
        let imgPath = imgFile.path;
        data["imgURL"] = "\\" + imgPath;
        console.log(data);
    }
    if (Object.values(errors).includes(true)) {
        let breeds = await getAllBreeds();
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