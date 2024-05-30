const { getMovieById } = require("../services/movies");

async function showDetails(req, res) {
    let id = req.params.id;
    let movie = await getMovieById(id);
    let moviehdb = {};
    if (!movie) {
        res.render("error");
        return;
    }
    moviehdb["id"] = movie._id;
    moviehdb["titlehdb"] = movie.title;
    moviehdb["genrehdb"] = movie.genre;
    moviehdb["descriptionhdb"] = movie.description;
    moviehdb["directorhdb"] = movie.director;
    moviehdb["imageURLhdb"] = movie.imageURL;
    moviehdb["ratinghdb"] = movie.rating;
    moviehdb["yearhdb"] = movie.year;
    let count = moviehdb.ratinghdb
    moviehdb.ratinghdb = "&#9733;".repeat(count);
    res.render("details", { moviehdb });
}

module.exports = {
    showDetails
}