const { createMovie } = require("../services/movies");

function showCreateForm(req, res) {
    res.render("createMovie");
}

async function onCreate(req, res) {
    let data = req.body;
    let errors = {
        title: !data.title,
        director: !data.director,
        year: !data.year,
        description: !data.description,
        genre: !data.genre,
        rating: !data.rating,
        imageURL: !data.imageURL
    }
    if (Object.values(errors).includes(true)) {
        res.render("createMovie", { movie: req.body, errors });
        return;
    }
    await createMovie(data);
    res.redirect("/");
}

module.exports = {
    showCreateForm,
    onCreate
}