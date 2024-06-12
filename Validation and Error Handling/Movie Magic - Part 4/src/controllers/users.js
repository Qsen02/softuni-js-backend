const { Router } = require("express");
const { login, register } = require("../services/users");
const { setToken } = require("../services/token");
const { isGuest } = require("../middlewears/guards");
const { body, validationResult } = require("express-validator");
const { parseError } = require("../util");

let userRouter = Router();

userRouter.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
});
userRouter.get("/login", isGuest(), (req, res) => {
    res.render("login");
});
userRouter.post("/login",
    body("email").trim().isEmail().withMessage("Enter valid email!"),
    body("password").trim().isAlphanumeric().isLength({ min: 6 }).withMessage("Password must be at least 6 symobls long!"),
    isGuest(),
    async(req, res) => {
        let fields = req.body;
        try {
            let results = validationResult(req);
            if (results.errors.length) {
                throw results.errors
            }
            let user = await login(fields.email, fields.password);
            let token = setToken(user);
            res.cookie("token", token, { httpOnly: true });
            res.redirect("/");
        } catch (err) {
            res.render("login", { errors: parseError(err).errors, fields });
            return;
        }
    });
userRouter.get("/register", isGuest(), (req, res) => {
    res.render("register");
});

userRouter.post("/register", isGuest(),
    body("email").trim().isEmail().withMessage("Enter valid email!"),
    body("password").trim().isAlphanumeric().isLength({ min: 6 }).withMessage("Password must be at leat 6 symbols long!"),
    body("repass").trim().custom((value, { req }) => req.body.password == value).withMessage("Password must match"),
    async(req, res) => {
        let fields = req.body;
        let email = fields.email;
        let password = fields.password;
        try {
            const results = validationResult(req);
            if (results.errors.length) {
                throw results.errors;
            }
            let user = await register(email, password);
            let token = setToken(user);
            res.cookie("token", token, { httpOnly: true });
            res.redirect("/");
        } catch (err) {
            let fields = req.body;
            res.render("register", { errors: parseError(err).errors, fields })
            return;
        }
    });

module.exports = {
    userRouter
}