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
    let imgURLArr = cat.imgURL.split("\\");
    let imgToDel = imgURLArr[imgURLArr.length - 1];
    let data = req.body;
    if (req.file) {
        let imgFile = req.file;
        let imgPath = imgFile.path;
        data["imgURL"] = "\\" + imgPath;
        console.log(data);
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