const { getAllStones, searching } = require("../services/stones");

async function showSearchPage(req, res) {
    let stones = await getAllStones().lean();
    res.render("search", { stones });
}

async function onSearch(req, res) {
    let url = req.url;
    let query = url.split("?")[1];
    let name = query.split("=")[1].replaceAll("+", " ");
    let stones = await searching(name).lean();
    res.render("search", { stones })
}

module.exports = {
    showSearchPage,
    onSearch
}