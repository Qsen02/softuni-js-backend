const { getMovies, searching } = require("../services/dataService");

async function showSerchMenu(req, res) {
    let movies = await getMovies();
    let hasMovies = true;
    if (movies.length == 0) {
        hasMovies = false;
    }
    res.render("search", { movies, hasMovies })
}

async function onSearch(req, res) {
    let valueArr = req.url.split("?")[1];
    let values = valueArr.split("&");
    let valuesObj = {};
    for (let value of values) {
        let curValue = value.split("=");
        valuesObj[curValue[0]] = curValue[1];
    }
    let movies = await searching(valuesObj);
    let hasMovies = true;
    if (movies.length == 0) {
        hasMovies = false;
    }
    res.render("search", { movies, hasMovies })
}

module.exports = {
    showSerchMenu,
    onSearch
}