const { getMovieById, checkMovieId } = require("../services/movies");

async function showDetails(req, res) {;
    let id = req.params.id;
    let isValid = await checkMovieId(id);
    let isCasts = true;
    let user = req.user;
    if (!isValid) {
        res.render("error");
        return;
    }
    let movie = await getMovieById(id).lean();
    movie.userDataId = user && movie.creatorId == user._id;
    if (movie.casts.length == 0) {
        isCasts = false;
    }
    let count = movie.rating;
    movie.rating = "&#9733;".repeat(count);
    res.render("details", { movie, isCasts });
}

module.exports = {
    showDetails
}