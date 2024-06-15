const { Router } = require("express");
const { getLatestStones, getAllStones, checkStoneId, getStoneById } = require("../services/stones");

let homeRouter = Router();

homeRouter.get("/", async(req, res) => {
    let latestStones = await getLatestStones().lean();
    res.render("home", { latestStones });
});

homeRouter.get("/catalog", async(req, res) => {
    let stones = await getAllStones().lean();
    res.render("catalog", { stones })
});

homeRouter.get("/details/:id", async(req, res) => {
    let stoneId = req.params.id;
    let user = req.user;
    let isValid = await checkStoneId(stoneId);
    if (!isValid) {
        res.render("404");
        return;
    }
    let stone = await getStoneById(stoneId).lean();
    stone["isOwner"] = false;
    stone["isLiked"] = false;
    if (user) {
        stone.isOwner = user._id.toString() == stone.ownerId;
        stone.isLiked = Boolean(stone.likedList.find(el => el.toString() == user._id));
    }
    res.render("details", { stone });
});

module.exports = {
    homeRouter
}