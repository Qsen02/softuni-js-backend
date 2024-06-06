const { register } = require("../services/users");

async function showRegisterForm(req, res) {
    let user = req.session.user;
    res.render("register", { user })
}

async function onRegister(req, res) {
    let user = req.session.user;
    let fields = req.body;
    let email = fields.email;
    let password = fields.password
    let repass = fields.repass;
    try {
        await register(email, password, repass);
    } catch (err) {
        let fields = req.body;
        res.render("register", { error: err.message, user, fields })
        return;
    }
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