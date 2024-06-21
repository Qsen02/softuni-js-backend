const { Router } = require("express");
const { isUser } = require("../middlewares/guards");
const { body, validationResult } = require("express-validator");
const { errorParser } = require("../util");
const { createCreature, checkCreatureId, deleteCreature, getCreatureById, editCreature, voting } = require("../services/creatures");

const creatureRouter = Router();

creatureRouter.get("/create", isUser(), (req, res) => {
    res.render("create");
})

creatureRouter.post("/create", isUser(),
    body("name").isLength({ min: 2 }).withMessage("Name must be at least 2 symbols long!"),
    body("species").isLength({ min: 3 }).withMessage("Species  must be at least 3 symbols long!"),
    body("image").matches(/^https?:\/\//).withMessage("Image must be valid URL!"),
    body("skinColor").isLength({ min: 3 }).withMessage("Skin color must be at least 3 symbols long!"),
    body("eyeColor").isLength({ min: 3 }).withMessage("Eye color must be at least 3 symbols long!"),
    body("description").isLength({ min: 5, max: 500 }).withMessage("Description must be at between 5 and 500 symbols!"),
    async(req, res) => {
        let fields = req.body;
        let user = req.user;
        try {
            let results = validationResult(req);
            if (results.errors.length) {
                throw results.errors;
            }
            await createCreature(fields, user);
            res.redirect("/catalog");
        } catch (err) {
            res.render("create", { errors: errorParser(err).errors, fields })
        }
    });

creatureRouter.get("/catalog/:id/delete", isUser(), async(req, res) => {
    let id = req.params.id;
    let isValid = await checkCreatureId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    await deleteCreature(id);
    res.redirect("/catalog");
});

creatureRouter.get("/catalog/:id/edit", isUser(), async(req, res) => {
    let id = req.params.id;
    let isValid = await checkCreatureId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    let fields = await getCreatureById(id).lean();
    res.render("edit", { fields });
})

creatureRouter.post("/catalog/:id/edit", isUser(),
    body("name").isLength({ min: 2 }).withMessage("Name must be at least 2 symbols long!"),
    body("species").isLength({ min: 3 }).withMessage("Species  must be at least 3 symbols long!"),
    body("image").matches(/^https?:\/\//).withMessage("Image must be valid URL!"),
    body("skinColor").isLength({ min: 3 }).withMessage("Skin color must be at least 3 symbols long!"),
    body("eyeColor").isLength({ min: 3 }).withMessage("Eye color must be at least 3 symbols long!"),
    body("description").isLength({ min: 5, max: 500 }).withMessage("Description must be at between 5 and 500 symbols!"),
    async(req, res) => {
        let fields = req.body;
        let id = req.params.id;
        let isValid = await checkCreatureId(id);
        if (!isValid) {
            res.render("404");
            return;
        }
        try {
            let results = validationResult(req);
            if (results.errors.length) {
                throw results.errors;
            }
            await editCreature(id, fields);
            res.redirect(`/catalog/${id}`);
        } catch (err) {
            res.render("edit", { errors: errorParser(err).errors, fields })
        }
    });

creatureRouter.get("/catalog/:id/vote/", isUser(), async(req, res) => {
    let id = req.params.id;
    let user = req.user;
    let isValid = await checkCreatureId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    await voting(id, user);
    res.redirect(`/catalog/${id}`);
})

module.exports = {
    creatureRouter
}