const { Router } = require("express");
const { getAllCasts, getCastById, attach, checkCastId, createCast } = require("../services/casts");
const { getMovieById, checkMovieId } = require("../services/movies");
const { isUser } = require("../middlewears/guards");
const { body, validationResult } = require("express-validator");
const { parseError } = require("../util");

let castRouter = Router();

castRouter.get("/cast/create", isUser(), (req, res) => {
    res.render("createCast");
});

castRouter.post("/cast/create",
    body("name").trim().isAlphanumeric().isLength({ min: 5 }).withMessage("Name must be at least 5 symbols with letters and digits only!"),
    body("age").trim().isInt({ min: 1, max: 120 }).withMessage("Age must be between 1 and 120!"),
    body("born").trim().isAlphanumeric().isLength({ min: 10 }).withMessage("Born place must be at least 10 symbols with letters and digits only!"),
    body("nameInMovie").trim().isAlphanumeric().isLength({ min: 5 }).withMessage("Name in movie must be at least 5 symbols with letters and digits only!"),
    body("castImg").trim().isURL().withMessage("Cast image must be valid URL!"),
    isUser(),
    async(req, res) => {
        let data = req.body;
        try {
            let result = validationResult(req);
            if (result.errors.length) {
                throw result.errors;
            }
            await createCast(data);
            res.redirect("/");
        } catch (err) {
            res.render("createCast", { errors: parseError(err).errors, data });
            return;
        }

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