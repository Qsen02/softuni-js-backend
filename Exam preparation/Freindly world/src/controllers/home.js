const { Router } = require("express");
const { getLatestAnimals, getAllAnimals, checkAnimalId, getAnimalById, searching } = require("../services/animals");

const homeRouter = Router();

homeRouter.get("/", async(req, res) => {
    let animals = await getLatestAnimals().lean();
    res.render("home", { animals });
})

homeRouter.get("/catalog", async(req, res) => {
    let animals = await getAllAnimals().lean();
    res.render("catalog", { animals });
});

homeRouter.get("/catalog/:id", async(req, res) => {
    let id = req.params.id;
    let user = req.user;
    let isValid = await checkAnimalId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    let animal = await getAnimalById(id).lean();
    if (user) {
        animal.isOwner = animal.owner.toString() == user._id.toString();
        animal.isDonate = Boolean(animal.donations.find(el => el.toString() == user._id.toString()));
    }
    res.render("details", { animal });
})

homeRouter.get("/search", async(req, res) => {
    let query = req.query;
    let animals = await searching(query).lean();
    res.render("search", { animals });
})

module.exports = {
    homeRouter
}