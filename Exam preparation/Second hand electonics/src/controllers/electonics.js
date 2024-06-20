const { Router } = require("express");
const { isUser } = require("../middlewares/guards");
const { body, validationResult } = require("express-validator");
const { errorParser } = require("../util");
const { createElectronics, deleteElectronics, checkElectronicsId, getElectronicsById, editElectronics, buyElectronics } = require("../services/electronics");

const electronicRouter = Router();

electronicRouter.get("/products/create", isUser(), (req, res) => {
    res.render("create");
});

electronicRouter.post("/products/create",
    body("name").isLength({ min: 10 }).withMessage("Name must be at least 10 symbols long!"),
    body("type").isLength({ min: 2 }).withMessage("Type must be at least 2 symbols long!"),
    body("damages").isLength({ min: 10 }).withMessage("Damages must be at least 10 symbols long!"),
    body("image").matches(/^https?:\/\//).withMessage("Image must be valid URL!"),
    body("description").isLength({ min: 10, max: 200 }).withMessage("Description must be between 10 and 200 symbols long!"),
    body("production").isInt({ min: 1900, max: 2024 }).withMessage("Production must be between 1900 and 2024!"),
    body("exploitation").isInt({ min: 0 }).withMessage("Exploitation must be positive number!"),
    body("price").isInt({ min: 0 }).withMessage("Price must be positive number!"),
    isUser(),
    async(req, res) => {
        let fields = req.body;
        let user = req.user;
        try {
            let results = validationResult(req);
            if (results.errors.length) {
                throw results.errors;
            }
            await createElectronics(fields, user);
            res.redirect("/catalog");
        } catch (err) {
            res.render("create", { errors: errorParser(err).errors, fields });
        }
    });

electronicRouter.get("/products/delete/:id", isUser(), async(req, res) => {
    let offerId = req.params.id;
    let isValid = await checkElectronicsId(offerId);
    if (!isValid) {
        res.render("404");
        return;
    }
    await deleteElectronics(offerId);
    res.redirect("/catalog");
})

electronicRouter.get("/products/edit/:id", isUser(), async(req, res) => {
    let offerId = req.params.id;
    let isValid = await checkElectronicsId(offerId);
    if (!isValid) {
        res.render("404");
        return;
    }
    let fields = await getElectronicsById(offerId).lean();
    res.render("edit", { fields });
})

electronicRouter.post("/products/edit/:id",
    body("name").isLength({ min: 10 }).withMessage("Name must be at least 10 symbols long!"),
    body("type").isLength({ min: 2 }).withMessage("Type must be at least 2 symbols long!"),
    body("damages").isLength({ min: 10 }).withMessage("Damages must be at least 10 symbols long!"),
    body("image").matches(/^https?:\/\//).withMessage("Image must be valid URL!"),
    body("description").isLength({ min: 10, max: 200 }).withMessage("Description must be between 10 and 200 symbols long!"),
    body("production").isInt({ min: 1900, max: 2024 }).withMessage("Production must be between 1900 and 2024!"),
    body("exploitation").isInt({ min: 0 }).withMessage("Exploitation must be positive number!"),
    body("price").isInt({ min: 0 }).withMessage("Price must be positive number!"),
    isUser(),
    async(req, res) => {
        let fields = req.body;
        let offerId = req.params.id;
        let isValid = await checkElectronicsId(offerId);
        if (!isValid) {
            res.render("404");
            return;
        }
        try {
            let results = validationResult(req);
            if (results.errors.length) {
                throw results.errors;
            }
            await editElectronics(offerId, fields);
            res.redirect(`/catalog/${offerId}`);
        } catch (err) {
            res.render("edit", { errors: errorParser(err).errors, fields });
        }
    });

electronicRouter.get("/products/buy/:id", isUser(), async(req, res) => {
    let offerId = req.params.id;
    let user = req.user;
    let isValid = await checkElectronicsId(offerId);
    if (!isValid) {
        res.render("404");
        return;
    }
    await buyElectronics(offerId, user);
    res.redirect(`/catalog/${offerId}`);
})

module.exports = {
    electronicRouter
}