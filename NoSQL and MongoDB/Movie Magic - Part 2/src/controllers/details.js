const { getMovieById } = require("../services/movies");

async function showDetails(req, res) {
    let id = req.params.id;
    let movie = await getMovieById(id).lean();
    if (!movie) {
        res.render("error");
        return;
    }
    let count = movie.rating
    movie.rating = "&#9733;".repeat(count);
    res.render("details", { movie });
}

module.exports = {
    showDetails
}