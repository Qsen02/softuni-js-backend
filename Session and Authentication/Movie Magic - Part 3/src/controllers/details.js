const { getMovieById, checkMovieId } = require("../services/movies");

async function showDetails(req, res) {
    let user = req.session.user;
    let id = req.params.id;
    let isValid = await checkMovieId(id);
    if (!isValid) {
        res.render("error", { user });
        return;
    }
    let movie = await getMovieById(id).lean();
    let count = movie.rating
    movie.rating = "&#9733;".repeat(count);
    res.render("details", { movie, user });
}

module.exports = {
    showDetails
}