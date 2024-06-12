const { Router } = require("express");
const { getAllCasts, getCastById, attach, checkCastId, createCast } = require("../services/casts");
const { getMovieById, checkMovieId } = require("../services/movies");
const { isUser } = require("../middlewears/guards");

let castRouter = Router();

castRouter.get("/cast/create", isUser(), (req, res) => {
    res.render("createCast");
});

castRouter.post("/cast/create", isUser(), async(req, res) => {
    let data = req.body;
    let errors = {
        name: !data.name,
        age: !data.age,
        castImg: !data.castImg,
        born: !data.born,
        nameInMovie: !data.nameInMovie,
    }
    if (Object.values(errors).includes(true)) {
        res.render("createCast", { errors, data });
        return;
    }
    await createCast(data);
    res.redirect("/");
});

castRouter.get("/movies/:id/attach", isUser(), async(req, res) => {
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
});

castRouter.post("/movies/:id/attach", isUser(), async(req, res) => {
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
});

module.exports = {
    castRouter
}