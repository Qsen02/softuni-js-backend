const { login } = require("../services/users");

async function showLoginForm(req, res) {
    let user = req.session.user;
    res.render("login", { user });
}

async function onLogin(req, res) {
    let user = req.session.user;
    let fields = req.body;
    let empty = false;
    let isValidUser = false;
    if (!fields.email || !fields.password) {
        empty = true;
        res.render("login", { user, empty });
        return
    }
    let curUser = await login(fields.email, fields.password, fields);
    if (!curUser) {
        isValidUser = true;
        res.render("login", { user, isValidUser, fields });
        return;
    }
    req.session.user = curUser;
    res.redirect("/");
}

module.exports = {
    showLoginForm,
    onLogin
}