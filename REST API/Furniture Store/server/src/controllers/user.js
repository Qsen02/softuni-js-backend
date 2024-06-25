const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const { errorParser } = require("../util");
const { register, login } = require("../services/user");
const { setToken } = require("../services/token");
const { isUser } = require("../middlewares/guards");

const userRouter = Router();

userRouter.post("/register",
    body("email").trim().isLength({ min: 10 }).isEmail().withMessage("Email must be at least 10 symbols long!"),
    body("password").trim().isLength({ min: 4 }).withMessage("Password must be at least 4 symbols long!"),
    async(req, res) => {
        let fields = req.body;
        try {
            let results = validationResult(req);
            if (results.errors.length) {
                throw results.errors;
            }
            let user = await register(fields.email, fields.password);
            let token = setToken(user);
            res.json({
                email: token.payload.email,
                _id: token.payload._id,
                accessToken: token.accestoken
            });
        } catch (err) {
            res.status(400).json({ message: errorParser(err).errors });
        }
    });
userRouter.get("/logout", isUser(), (req, res) => {
    res.status(200).json({ message: "Logout was successfull!" });
});

userRouter.post("/login", async(req, res) => {
    let fields = req.body;
    try {
        let user = await login(fields.email, fields.password);
        let token = setToken(user);
        res.json({
            email: token.payload.email,
            _id: token.payload._id,
            accessToken: token.accesstoken
        });
    } catch (err) {
        res.status(400).json({ message: errorParser(err).errors });
    }
})
module.exports = {
    userRouter
}