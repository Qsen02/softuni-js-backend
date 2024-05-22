const { getMovies, searching } = require("../services/dataService");

function showSerchMenu(req, res) {
    let movies = getMovies();
    let hasMovies = true;
    if (movies.length == 0) {
        hasMovies = false;
    }
    res.render("search", { movies, hasMovies })
}

function onSearch(req, res) {
    let data = req.body;
    let movies = searching(data);
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