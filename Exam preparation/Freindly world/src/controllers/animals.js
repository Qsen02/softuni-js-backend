const { Router } = require("express");
const { isUser } = require("../middlewares/guards");
const { body, validationResult } = require("express-validator");
const { errorParser } = require("../util");
const { createAnimal, getAnimalById, editAnimal, checkAnimalId, deleteAnimal, donating } = require("../services/animals");

const animalRouter = Router();

animalRouter.get("/create", isUser(), (req, res) => {
    res.render("create");
})

animalRouter.post("/create", isUser(),
    body("name").isLength({ min: 2 }).withMessage("Name must be at least 2 symbols long!"),
    body("kind").isLength({ min: 3 }).withMessage("Kind must be at least 3 symbols long!"),
    body("image").matches(/^https?:\/\//).withMessage("Image must be valid URL!"),
    body("years").isInt({ min: 1, max: 100 }).withMessage("Years are between 1 and 100!"),
    body("need").isLength({ min: 3, max: 20 }).withMessage("Needs are between 3 and 20!"),
    body("description").isLength({ min: 5, max: 50 }).withMessage("Description are between 5 and 50!"),
    body("location").isLength({ min: 5, max: 15 }).withMessage("Location are between 5 and 15!"),
    async(req, res) => {
        let fields = req.body;
        let user = req.user;
        try {
            let results = validationResult(req);
            if (results.errors.length) {
                throw results.errors;
            }
            await createAnimal(fields, user);
            res.redirect("/catalog");
        } catch (err) {
            res.render("create", { errors: errorParser(err).errors, fields });
        }
    });
animalRouter.get("/catalog/:id/edit", isUser(), async(req, res) => {
    let id = req.params.id;
    let isValid = await checkAnimalId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    let fields = await getAnimalById(id).lean();
    res.render("edit", { fields });
});

animalRouter.post("/catalog/:id/edit", isUser(),
    body("name").isLength({ min: 2 }).withMessage("Name must be at least 2 symbols long!"),
    body("kind").isLength({ min: 3 }).withMessage("Kind must be at least 3 symbols long!"),
    body("image").matches(/^https?:\/\//).withMessage("Image must be valid URL!"),
    body("years").isInt({ min: 1, max: 100 }).withMessage("Years are between 1 and 100!"),
    body("need").isLength({ min: 3, max: 20 }).withMessage("Needs are between 3 and 20!"),
    body("description").isLength({ min: 5, max: 50 }).withMessage("Description are between 5 and 50!"),
    body("location").isLength({ min: 5, max: 15 }).withMessage("Location are between 5 and 15!"),
    async(req, res) => {
        let id = req.params.id;
        let isValid = await checkAnimalId(id);
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
            await editAnimal(id, fields);
            res.redirect(`/catalog/${id}`);
        } catch (err) {
            res.render("edit", { errors: errorParser(err).errors, fields });
        }
    });

animalRouter.get("/catalog/:id/delete", isUser(), async(req, res) => {
    let id = req.params.id;
    let isValid = await checkAnimalId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    await deleteAnimal(id);
    res.redirect("/catalog");
});

animalRouter.get("/catalog/:id/donate", isUser(), async(req, res) => {
    let id = req.params.id;
    let user = req.user;
    let isValid = await checkAnimalId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    await donating(id, user);
    res.redirect(`/catalog/${id}`);
})

module.exports = {
    animalRouter
}