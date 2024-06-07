const { login } = require("../services/users");
const { setToken } = require("../services/token");

async function showLoginForm(req, res) {
    res.render("login");
}

async function onLogin(req, res) {
    let fields = req.body;
    try {
        if (!fields.email || !fields.password) {
            throw new Error("All fields required!");
        }
        let user = await login(fields.email, fields.password);
        let token = setToken(user);
        res.cookie("token", token, { httpOnly: true });
        res.redirect("/");
    } catch (err) {
        res.render("login", { error: err.message, fields });
        return;
    }
}

module.exports = {
    showLoginForm,
    onLogin
}