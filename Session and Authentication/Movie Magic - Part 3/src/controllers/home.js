let { getMovies } = require("../services/movies")

async function showHome(req, res) {
    let user = req.session.user;
    let movies = await getMovies().lean();
    let hasMovies = true;
    if (movies.length == 0) {
        hasMovies = false;
    }
    res.render("home", { movies, hasMovies, user });
}

function showAbout(req, res) {
    let user = req.session.user;
    res.render("about", { user });
}

module.exports = {
    showHome,
    showAbout
}