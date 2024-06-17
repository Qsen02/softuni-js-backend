const { Router } = require("express");
const { isGuest, isUser } = require("../middlewares/guards");
const { body, validationResult } = require("express-validator");
const { register, login } = require("../services/user");
const { setToken } = require("../services/token");
const { errorParser } = require("../util");

const userRouter = Router();

userRouter.get("/register", isGuest(), (req, res) => {
    res.render("register");
})

userRouter.post("/register",
    body("username").trim().isLength({ min: 2 }).withMessage("Username must be at least 2 symbols long!"),
    body("email").trim().isLength({ min: 10 }).withMessage("Email must be at least 10 symbols long!"),
    body("password").trim().isLength({ min: 4 }).withMessage("Password must be at least 4 symbols long!"),
    body("repass").trim().custom((value, { req }) => req.body.password == value).withMessage("Password must match!"),
    isGuest(),
    async(req, res) => {
        let fields = req.body;
        try {
            let results = validationResult(req);
            if (results.errors.length) {
                throw results.errors;
            }
            let user = await register(fields.email, fields.username, fields.password);
            let token = setToken(user);
            res.cookie("token", token, { httpOnly: true });
            res.redirect("/");
        } catch (err) {
            res.render("register", { errors: errorParser(err).errors, fields });
        }
    });

userRouter.get("/login", isGuest(), (req, res) => {
    res.render("login");
});

userRouter.post("/login", isGuest(), async(req, res) => {
    let fields = req.body;
    try {
        let user = await login(fields.email, fields.password);
        let token = setToken(user);
        res.cookie("token", token, { httpOnly: true });
        res.redirect("/");
    } catch (err) {
        res.render("login", { errors: errorParser(err).errors, fields });
    }
})

userRouter.get("/logout", isUser(), (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
})
module.exports = {
    userRouter
}