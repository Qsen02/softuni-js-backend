const { checkMovieId, getMovieById, editMovie } = require("../services/movies");

async function showEditForm(req, res) {
    const id = req.params.id;
    let isValid = await checkMovieId(id);
    if (!isValid) {
        res.render("error", { user });
        return;
    }
    let movie = await getMovieById(id).lean();
    res.render("edit", { movie });
}

async function onEdit(req, res) {
    const id = req.params.id;
    let fields = req.body;
    let isValid = await checkMovieId(id);
    if (!isValid) {
        res.render("error");
        return;
    }
    let errors = {
        title: !fields.title,
        director: !fields.director,
        year: !fields.year,
        description: !fields.description,
        genre: !fields.genre,
        rating: !fields.rating,
        imageURL: !fields.imageURL
    }
    if (Object.values(errors).includes(true)) {
        let movie = await getMovieById(id).lean();
        res.render("edit", { movie, errors });
        return;
    }
    await editMovie(id, fields);
    res.redirect(`/details/${id}`);
}

module.exports = {
    showEditForm,
    onEdit
}