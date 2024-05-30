let { getMovies } = require("../services/movies")

async function showHome(req, res) {
    let movies = await getMovies();
    let hasMovies = true;
    let movieshdb = [];
    if (movies.length == 0) {
        hasMovies = false;
    } else {
        for (let movie of movies) {
            let moviehdb = {};
            moviehdb["id"] = movie._id;
            moviehdb["titlehdb"] = movie.title;
            moviehdb["genrehdb"] = movie.genre;
            moviehdb["descriptionhdb"] = movie.description;
            moviehdb["directorhdb"] = movie.director;
            moviehdb["imageURLhdb"] = movie.imageURL;
            moviehdb["ratinghdb"] = movie.rating;
            moviehdb["yearhdb"] = movie.year;
            movieshdb.push(moviehdb);
        }
    }

    res.render("home", { movieshdb, hasMovies });
}

function showAbout(req, res) {
    res.render("about");
}

module.exports = {
    showHome,
    showAbout
}