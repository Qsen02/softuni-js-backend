const { getMovieById } = require("../services/dataService");

async function showDetails(req, res) {
    let id = req.params.id;
    let movie = await getMovieById(id);
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