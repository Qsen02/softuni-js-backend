let { getMovies } = require("../services/movies");
const { getUserData } = require("../services/users");

async function showHome(req, res) {
    let user = req.session.user;
    let movies = await getMovies().lean();
    if (user) {
        let userData = await getUserData(user.email).lean();
        let userDataId = userData.toString();
        for (let movie of movies) {
            if (userDataId == movie._id) {
                movie.userDataId = true;
            } else {
                movie.userDataId = false;
            }
        }
    }
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