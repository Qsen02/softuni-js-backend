const { getMovieById, checkMovieId } = require("../services/movies");

async function showDetails(req, res) {
    let id = req.params.id;
    let isValid = await checkMovieId(id);
    if (!isValid) {
        res.render("error");
        return;
    }
    let movie = await getMovieById(id).lean();
    let count = movie.rating
    movie.rating = "&#9733;".repeat(count);
    res.render("details", { movie });
}

module.exports = {
    showDetails
}