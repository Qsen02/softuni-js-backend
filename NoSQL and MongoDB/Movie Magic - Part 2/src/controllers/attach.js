const { getAllCasts, getCastById, attach } = require("../services/casts");
const { getMovieById } = require("../services/movies");

async function showAttachForm(req, res) {
    let id = req.params.id;
    let movieData = await getMovieById(id).lean();
    let data = await getAllCasts().lean();
    res.render("attach", { movieData, data });
}

async function onAttach(req, res) {
    let castId = req.body.cast;
    let id = req.params.id;
    let data = await getCastById(castId);
    await attach(id, data);
    res.redirect(`/details/${id}`);
}

module.exports = {
    showAttachForm,
    onAttach
}