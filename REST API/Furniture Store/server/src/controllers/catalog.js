const { Router } = require("express");
const { getAllFurnitures } = require("../services/furnitures");

const catalogRouter = Router();

catalogRouter.get("/", async(req, res) => {
    let furnitures = await getAllFurnitures().lean();
    res.json(furnitures);
})

module.exports = {
    catalogRouter
}