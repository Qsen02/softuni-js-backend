const { Router } = require("express");
const { lastThreeRecipies, getAllRecipies, checkRecipieId, getRecipieById, searching } = require("../services/recipies");

const homeRouter = Router();

homeRouter.get("/", async(req, res) => {
    let recipies = await lastThreeRecipies().lean();
    res.render("home", { recipies });
});

homeRouter.get("/catalog", async(req, res) => {
    let recipies = await getAllRecipies().lean();
    res.render("catalog", { recipies });
});

homeRouter.get("/catalog/:id", async(req, res) => {
    let id = req.params.id;
    let user = req.user;
    let isValid = await checkRecipieId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    let recipie = await getRecipieById(id).lean();
    recipie.recommendCount = recipie.recommendList.length;
    if (user) {
        recipie.isOwner = recipie.owner.toString() == user._id.toString();
        recipie.isRecommend = Boolean(recipie.recommendList.find(el => el.toString() == user._id.toString()));
    }
    res.render("details", { recipie });
});

homeRouter.get("/search", async(req, res) => {
    let query = req.query;
    let recipies = await searching(query).lean();
    res.render("search", { recipies });
});

module.exports = {
    homeRouter
}