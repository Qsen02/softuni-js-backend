let { getMovies } = require("../services/movies");

async function showHome(req, res) {
    let movies = await getMovies().lean();
    let user = req.user;
    for (let movie of movies) {
        movie.userDataId = user && user._id == movie.creatorId;
    }
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