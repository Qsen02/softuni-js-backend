const { createMovie } = require("../services/movies");
const { getUserData } = require("../services/users");

function showCreateForm(req, res) {
    let user = req.session.user;
    res.render("createMovie", { user });
}

async function onCreate(req, res) {
    let user = req.session.user;
    let userData = await getUserData(user.email);
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
        res.render("createMovie", { movie: req.body, errors, user });
        return;
    }
    await createMovie(data, userData);
    res.redirect("/");
}

module.exports = {
    showCreateForm,
    onCreate
}