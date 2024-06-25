const { Router } = require("express");
const { getAllFurnitures, createFurniture, getFurnitureById, checkFurnitureId, editFurniture, deleteFurniture, getAuthorCreation } = require("../services/furnitures");
const { body, validationResult } = require("express-validator");
const { isUser } = require("../middlewares/guards");
const { errorParser } = require("../util");

const catalogRouter = Router();

catalogRouter.get("/", async(req, res) => {
    let furnitures = [];
    if (req.query.where) {
        let userId = req.query.where.split("=")[1].replaceAll('"', "");
        if (userId) {
            furnitures = await getAuthorCreation(userId).lean();
        }
    } else {
        furnitures = await getAllFurnitures().lean();
    }
    res.json(furnitures);
})

catalogRouter.post("/", isUser(),
    body("make").isLength({ min: 4 }).withMessage("Make must be at least 4 symbols long!"),
    body("model").isLength({ min: 4 }).withMessage("Model must be at least 4 symbols long!"),
    body("year").isInt({ min: 1950, max: 2050 }).withMessage("Year must be between 1950 and 2050!"),
    body("description").isLength({ min: 10 }).withMessage("Description must be at least 10 symbols long!"),
    body("price").isFloat({ min: 0 }).withMessage("Price must be positive number!"),
    async(req, res) => {
        let fields = req.body;
        try {
            let results = validationResult(req);
            if (results.errors.length) {
                throw results.errors;
            }
            await createFurniture(fields);
            res.status(200).json({ message: "Record was successfully created" });
        } catch (err) {
            res.status(400).json({ message: errorParser(err).errors });
        }
    })
catalogRouter.get("/:id", async(req, res) => {
    let id = req.params.id;
    let isValid = await checkFurnitureId(id);
    if (!isValid) {
        res.status(404).json({ message: "Page not found!" });
        return;
    }
    let furniture = await getFurnitureById(id).lean();
    res.json(furniture);
})


catalogRouter.put("/:id", isUser(),
    body("make").isLength({ min: 4 }).withMessage("Make must be at least 4 symbols long!"),
    body("model").isLength({ min: 4 }).withMessage("Model must be at least 4 symbols long!"),
    body("year").isInt({ min: 1950, max: 2050 }).withMessage("Year must be between 1950 and 2050!"),
    body("description").isLength({ min: 10 }).withMessage("Description must be at least 10 symbols long!"),
    body("price").isFloat({ min: 0 }).withMessage("Price must be positive number!"),
    async(req, res) => {
        let id = req.params.id;
        let isValid = await checkFurnitureId(id);
        if (!isValid) {
            res.status(404).json({ message: "Page not found!" });
            return;
        }
        let fields = req.body;
        try {
            let results = validationResult(req);
            if (results.errors.length) {
                throw results.errors;
            }
            await editFurniture(id, fields);
            res.status(200).json({ message: "Record was successfully edited" });
        } catch (err) {
            res.status(400).json({ message: errorParser(err).errors });
        }
    })

catalogRouter.delete("/:id", async(req, res) => {
    let id = req.params.id;
    let isValid = await checkFurnitureId(id);
    if (!isValid) {
        res.status(404).json({ message: "Page not found!" });
        return;
    }
    await deleteFurniture(id);
    res.status(200).json({ message: "Record was succesfully deleted!" })
})

module.exports = {
    catalogRouter
}