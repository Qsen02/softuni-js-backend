const { Router } = require("express");
const { isUser } = require("../middlewares/guards");
const { body, validationResult } = require("express-validator");
const { errorParser } = require("../util");
const { createRecipie, deleteRecipie, checkRecipieId, getRecipieById, editRecipie, recommending } = require("../services/recipies");

const recipieRouter = Router();

recipieRouter.get("/create", isUser(), (req, res) => {
    res.render("create");
})

recipieRouter.post("/create", isUser(),
    body("title").isLength({ min: 2 }).withMessage("Title must be at least 2 characters long!"),
    body("description").isLength({ min: 10, max: 100 }).withMessage("Description must be between 10 and 100 characters long!"),
    body("ingredients").isLength({ min: 10, max: 200 }).withMessage("Ingredients must be between 10 and 200 characters long!"),
    body("instructions").isLength({ min: 10 }).withMessage("Instuctions  must be at least 10 characters long!"),
    body("image").matches(/^https?:\/\//).withMessage("Image  must be valid URL!"),
    async(req, res) => {
        let fields = req.body;
        let user = req.user;
        try {
            let results = validationResult(req);
            if (results.errors.length) {
                throw results.errors;
            }
            await createRecipie(fields, user);
            res.redirect("/catalog");
        } catch (err) {
            res.render("create", { errors: errorParser(err).errors, fields });
        }
    });

recipieRouter.get("/catalog/:id/delete", isUser(), async(req, res) => {
    let id = req.params.id;
    let isValid = await checkRecipieId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    await deleteRecipie(id);
    res.redirect("/catalog");
});

recipieRouter.get("/catalog/:id/edit", isUser(), async(req, res) => {
    let id = req.params.id;
    let isValid = await checkRecipieId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    let recipie = await getRecipieById(id).lean();
    res.render("edit", { fields: recipie });
})

recipieRouter.post("/catalog/:id/edit", isUser(),
    body("title").isLength({ min: 2 }).withMessage("Title must be at least 2 characters long!"),
    body("description").isLength({ min: 10, max: 100 }).withMessage("Description must be between 10 and 100 characters long!"),
    body("ingredients").isLength({ min: 10, max: 200 }).withMessage("Ingredients must be between 10 and 200 characters long!"),
    body("instructions").isLength({ min: 10 }).withMessage("Instuctions  must be at least 10 characters long!"),
    body("image").matches(/^https?:\/\//).withMessage("Image  must be valid URL!"),
    async(req, res) => {
        let fields = req.body;
        let id = req.params.id;
        let isValid = await checkRecipieId(id);
        if (!isValid) {
            res.render("404");
            return;
        }
        try {
            let results = validationResult(req);
            if (results.errors.length) {
                throw results.errors;
            }
            await editRecipie(id, fields);
            res.redirect(`/catalog/${id}`);
        } catch (err) {
            res.render("edit", { errors: errorParser(err).errors, fields });
        }
    });

recipieRouter.get("/catalog/:id/recommend", isUser(), async(req, res) => {
    let id = req.params.id;
    let user = req.user;
    let isValid = await checkRecipieId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    await recommending(id, user);
    res.redirect(`/catalog/${id}`);
})

module.exports = {
    recipieRouter
}