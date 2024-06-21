const { Router } = require("express");
const { getAllCreatures, checkCreatureId, getCreatureById, getMyPosts } = require("../services/creatures");
const { isUser } = require("../middlewares/guards");

const homeRouter = Router();

homeRouter.get("/", (req, res) => {
    res.render("home");
})

homeRouter.get("/catalog", async(req, res) => {
    let creatures = await getAllCreatures().lean();
    res.render("catalog", { creatures });
})

homeRouter.get("/catalog/:id", async(req, res) => {
    let creatureId = req.params.id;
    let user = req.user;
    let isValid = await checkCreatureId(creatureId);
    if (!isValid) {
        res.render("404");
        return;
    }
    let creature = await getCreatureById(creatureId).lean();
    creature.voteCount = creature.votes.length;
    if (user) {
        creature.isOwner = creature.owner._id.toString() == user._id.toString();
        creature.isLiked = Boolean(creature.votes.find(el => el._id.toString() == user._id.toString()));
    }
    res.render("details", { creature });
})

homeRouter.get("/profile", isUser(), async(req, res) => {
    let user = req.user;
    let creatures = await getMyPosts(user).lean();
    creatures.forEach(el => el.voteCount = el.votes.length);
    res.render("profile", { creatures });
})

module.exports = {
    homeRouter
}