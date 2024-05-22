const { getMovieById } = require("../services/dataService");

function showDetails(req, res) {
    let id = req.params.id;
    let movie = getMovieById(id);
    res.render("details", { movie });
}

module.exports = {
    showDetails
}