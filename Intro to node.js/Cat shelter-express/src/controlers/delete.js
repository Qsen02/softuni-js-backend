const { getCatById, deleteCat } = require("../services/data");
const { delImg } = require("../services/images");

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
    let cat = await getCatById(id);
    let imgURLArr = cat.imgURL.split("\\");
    let imgName = imgURLArr[imgURLArr.length - 1];
    await deleteCat(id);
    if (imgName) {
        await delImg(imgName);
    }
    res.redirect("/");
}

module.exports = {
    showDeleteFrom,
    onDelete
}