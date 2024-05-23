const { getAllCats, searching } = require("../services/dataService");

async function showHome(req, res) {
    let cats = await getAllCats();
    let hasCats = true;
    if (cats.length == 0) {
        hasCats = false;
    }
    res.render("home", { cats, hasCats });
}

async function onSearch(req, res) {
    let values = req.url.split("?")[1];
    let value = values.split("=")[1];
    let cats = await searching(value);
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