const { createCast } = require("../services/casts");

function showCastForm(req, res) {
    let user = req.session.user;
    res.render("createCast", { user });
}

async function onCreateCast(req, res) {
    let user = req.session.user;
    let data = req.body;
    let errors = {
        name: !data.name,
        age: !data.age,
        castImg: !data.castImg,
        born: !data.born,
        nameInMovie: !data.nameInMovie,
    }
    if (Object.values(errors).includes(true)) {
        res.render("createCast", { errors, data, user });
        return;
    }
    await createCast(data);
    res.redirect("/");
}

module.exports = {
    showCastForm,
    onCreateCast
}