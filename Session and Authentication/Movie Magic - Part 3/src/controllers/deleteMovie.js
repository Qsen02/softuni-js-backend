const { checkMovieId, deleteMovie } = require("../services/movies");

async function showDeleteForm(req, res) {
    let user = req.session.user;
    let id = req.params.id;
    let isValid = await checkMovieId(id);
    if (!isValid) {
        res.status(400);
        res.write("You try to cheat but not succesfully :)");
        res.end();
        return;
    }
    res.render("delete", { id, user })
}

async function onDelete(req, res) {
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
}

async function onRefuse(req, res) {
    let id = req.params.id;
    let isValid = await checkMovieId(id);
    if (!isValid) {
        res.status(400);
        res.write("You try to cheat but not succesfully :)");
        res.end();
        return;
    }
    res.redirect(`/details/${id}`);
}

module.exports = {
    showDeleteForm,
    onDelete,
    onRefuse
}