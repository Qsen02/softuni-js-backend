const { Router } = require("express");
const { checkMovieId, getMovieById, editMovie, deleteMovie, createMovie } = require("../services/movies");
const { isUser } = require("../middlewears/guards");
const { parseError } = require("../util");

let movieRouter = Router();

movieRouter.get("/create", isUser(), (req, res) => {
    res.render("createMovie");
});

movieRouter.post("/create", isUser(), async(req, res) => {
    let user = req.user;
    let data = req.body;
    try {
        await createMovie(data, user);
        res.redirect("/");
    } catch (err) {
        res.render("createMovie", { movie: req.body, errors: parseError(err).errors });
        return;
    }
})

movieRouter.get("/movies/:id/delete", isUser(), async(req, res) => {
    let id = req.params.id;
    let isValid = await checkMovieId(id);
    if (!isValid) {
        res.status(400);
        res.write("You try to cheat but not succesfully :)");
        res.end();
        return;
    }
    res.render("delete", { id })
})

movieRouter.get("/movies/:id/delete/yes", isUser(), async(req, res) => {
    let id = req.params.id;
    let isValid = await checkMovieId(id);
    if (!isValid) {
        res.status(400);
        res.write("You try to cheat but not succesfully :)");
        res.end();
        return;
    }
    await deleteMovie(id);
    res.redirect("/");
})

movieRouter.get("/movies/:id/delete/no", isUser(), async(req, res) => {
    let id = req.params.id;
    let isValid = await checkMovieId(id);
    if (!isValid) {
        res.status(400);
        res.write("You try to cheat but not succesfully :)");
        res.end();
        return;
    }
    res.redirect(`/details/${id}`);
})

movieRouter.get("/movies/:id/edit", isUser(), async(req, res) => {
    const id = req.params.id;
    let isValid = await checkMovieId(id);
    if (!isValid) {
        res.render("error", { user });
        return;
    }
    let movie = await getMovieById(id).lean();
    res.render("edit", { movie });
})

movieRouter.post("/movies/:id/edit", isUser(), async(req, res) => {
    const id = req.params.id;
    let fields = req.body;
    let userId = req.user._id;
    let isValid = await checkMovieId(id);
    if (!isValid) {
        res.render("error");
        return;
    }
    try {
        await editMovie(id, fields, userId);
        res.redirect(`/details/${id}`);
    } catch (err) {
        let movie = await getMovieById(id).lean();
        res.render("edit", { movie, errors: parseError(err).errors });
        return;
    }
})

module.exports = {
    movieRouter
}