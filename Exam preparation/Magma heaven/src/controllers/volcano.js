const { Router } = require("express");
const { isUser } = require("../middlewares/guards");
const { body, validationResult } = require("express-validator");
const { errorParser } = require("../util");
const { createVolcano, checkVolcanoId, getVolcanoById, editVolcano, deleteVolcano, voting } = require("../services/volcano");

const volcanoRouter = Router();

volcanoRouter.get("/create", isUser(), (req, res) => {
    res.render("create");
})

volcanoRouter.post("/create",
    body("name").isLength({ min: 2 }).withMessage("Name must be at least 2 symbols long!"),
    body("location").isLength({ min: 3 }).withMessage("Location must be at least 3 symbols long!"),
    body("elevation").isInt({ min: 0 }).withMessage("Elevation must be positive number!"),
    body("lastEruption").isInt({ min: 0, max: 2024 }).withMessage("Year of the eruption must be between 0 and 2024!"),
    body("image").matches(/^https?:\/\//).withMessage("Image must be valid URL!"),
    body("description").isLength({ min: 10 }).withMessage("Description must be at least 10 symbols long!"),
    isUser(),
    async(req, res) => {
        let fields = req.body;
        let user = req.user;
        try {
            let results = validationResult(req);
            if (results.errors.length) {
                throw results.errors;
            }
            await createVolcano(fields, user);
            res.redirect("/catalog");
        } catch (err) {
            res.render("create", { errors: errorParser(err).errors, fields });
        }
    })

volcanoRouter.get("/edit/:id", isUser(), async(req, res) => {
    let id = req.params.id;
    let isValid = await checkVolcanoId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    let fields = await getVolcanoById(id).lean();
    res.render("edit", { fields })
})

volcanoRouter.post("/edit/:id",
    body("name").isLength({ min: 2 }).withMessage("Name must be at least 2 symbols long!"),
    body("location").isLength({ min: 3 }).withMessage("Location must be at least 3 symbols long!"),
    body("elevation").isInt({ min: 0 }).withMessage("Elevation must be positive number!"),
    body("lastEruption").isInt({ min: 0, max: 2024 }).withMessage("Year of the eruption must be between 0 and 2024!"),
    body("image").matches(/^https?:\/\//).withMessage("Image must be valid URL!"),
    body("description").isLength({ min: 10 }).withMessage("Description must be at least 10 symbols long!"),
    isUser(),
    async(req, res) => {
        let id = req.params.id;
        let isValid = await checkVolcanoId(id);
        if (!isValid) {
            res.render("404");
            return;
        }
        let fields = req.body;
        try {
            let results = validationResult(req);
            if (results.errors.length) {
                throw results.errors;
            }
            await editVolcano(id, fields);
            res.redirect(`/catalog/${id}`);
        } catch (err) {
            res.render("edit", { errors: errorParser(err).errors, fields });
        }
    })

volcanoRouter.get("/delete/:id", isUser(), async(req, res) => {
    let id = req.params.id;
    let isValid = await checkVolcanoId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    await deleteVolcano(id);
    res.redirect("/catalog");
})

volcanoRouter.get("/like/:id", isUser(), async(req, res) => {
    let id = req.params.id;
    let user = req.user;
    let isValid = await checkVolcanoId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    await voting(id, user);
    res.redirect(`/catalog/${id}`);
})

module.exports = {
    volcanoRouter
}