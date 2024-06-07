const { getAllCasts, getCastById, attach, checkCastId } = require("../services/casts");
const { getMovieById, checkMovieId } = require("../services/movies");

async function showAttachForm(req, res) {
    let id = req.params.id;
    let isValid = await checkMovieId(id);
    if (!isValid) {
        res.render("error");
        return;
    }
    let movieData = await getMovieById(id).lean();
    let allCasts = await getAllCasts().lean();
    let casts = [];
    movieData.casts.forEach(el => casts.push(el._id.toString()));
    let data = allCasts.filter(el => !casts.includes(el._id.toString()));
    res.render("attach", { movieData, data });
}

async function onAttach(req, res) {
    let castId = req.body.cast;
    let id = req.params.id;
    let isValidCast = await checkCastId(castId);
    let isValidMovie = await checkMovieId(id);
    let error = false;
    if (req.body.cast == "none") {
        error = true;
        let movieData = await getMovieById(id).lean();
        let data = await getAllCasts().lean();
        res.render("attach", { movieData, data, error });
        return;
    }
    if (!isValidCast || !isValidMovie) {
        res.status(400);
        res.write("You try to cheat but no succesfully :)");
        res.end();
        return;
    }
    let data = await getCastById(castId);
    await attach(id, data);
    res.redirect(`/details/${id}`);
}

module.exports = {
    showAttachForm,
    onAttach
}