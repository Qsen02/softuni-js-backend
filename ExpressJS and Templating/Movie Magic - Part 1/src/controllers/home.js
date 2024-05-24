let { getMovies } = require("../services/dataService")

async function showHome(req, res) {
    let movies = await getMovies();
    let hasMovies = true;
    if (movies.length == 0) {
        hasMovies = false;
    }
    res.render("home", { movies, hasMovies });
}

function showAbout(req, res) {
    res.render("about");
}

module.exports = {
    showHome,
    showAbout
}