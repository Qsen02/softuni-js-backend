const { getAllCats, searching } = require("../services/data");

async function showHome(req, res) {
    let cats = await getAllCats().lean();
    let hasCats = true;
    if (cats.length == 0) {
        hasCats = false;
    }
    res.render("home", { cats, hasCats });
}

async function onSearch(req, res) {
    let values = req.url.split("?")[1];
    let value = values.split("=")[1];
    if (value.includes("+")) {
        value = value.replaceAll("+", " ");
    }
    let cats = await searching(value).lean();
    let hasCats = true;
    if (cats.length == 0) {
        hasCats = false;
    }
    res.render("home", { cats, hasCats });
}

module.exports = {
    showHome,
    onSearch
}