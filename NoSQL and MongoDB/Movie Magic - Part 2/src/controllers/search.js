const { getMovies, searching } = require("../services/movies");

async function showSerchMenu(req, res) {
    let movies = await getMovies().lean();
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
    if (valuesObj.title.includes("+")) {
        valuesObj.title = valuesObj.title.trim();
        valuesObj.title = valuesObj.title.replaceAll("+", " ");
    }
    if (valuesObj.genre.includes("+")) {
        valuesObj.genre = valuesObj.genre.trim();
        valuesObj.genre = valuesObj.genre.replaceAll("+", " ");
    }
    let movies = await searching(valuesObj).lean();
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