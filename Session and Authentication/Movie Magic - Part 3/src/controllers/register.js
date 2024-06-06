const { register } = require("../services/users");

async function showRegisterForm(req, res) {
    let user = req.session.user;
    res.render("register", { user })
}

async function onRegister(req, res) {
    let user = req.session.user;
    let fields = req.body;
    let errors = {
        isEmpty: false,
        isCorrectPass: false,
        isMatch: false
    }
    if (!fields.email || !fields.password || !fields.repass) {
        errors.isEmpty = true;
        res.render("register", { errors, fields, user });
        return;
    }
    if (fields.password.length < 6) {
        errors.isCorrectPass = true;
        res.render("register", { errors, fields, user });
        return;
    }
    if (fields.password != fields.repass) {
        errors.isMatch = true;
        res.render("register", { errors, fields, user });
        return;
    }
    await register(fields.email, fields.password);
    req.session.user = {
        ["email"]: fields.email,
        ["password"]: fields.password
    };
    res.redirect("/");
}

module.exports = {
    showRegisterForm,
    onRegister
}