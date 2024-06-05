const { getMovieById, checkMovieId } = require("../services/movies");
const { getUserData } = require("../services/users");

async function showDetails(req, res) {
    let user = req.session.user;
    let isOwner = false;
    let id = req.params.id;
    let isValid = await checkMovieId(id);
    let isCasts = true;
    if (!isValid) {
        res.render("error", { user });
        return;
    }
    let movie = await getMovieById(id).lean();
    if (user) {
        let userData = await getUserData(user.email).lean();
        let id = userData._id;
        if (id.toString() == movie.creatorId) {
            isOwner = true;
        }
    }
    if (movie.casts.length == 0) {
        isCasts = false;
    }
    let count = movie.rating;
    movie.rating = "&#9733;".repeat(count);
    res.render("details", { movie, user, isOwner, isCasts });
}

module.exports = {
    showDetails
}