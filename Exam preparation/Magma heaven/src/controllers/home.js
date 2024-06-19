const { Router } = require("express");
const { getAllVolcanoes, checkVolcanoId, getVolcanoById, searching } = require("../services/volcano");

const homeRouter = Router();

homeRouter.get("/", (req, res) => {
    res.render("home");
})

homeRouter.get("/catalog", async(req, res) => {
    let volcanoes = await getAllVolcanoes().lean();
    let isEmpty = false;
    if (volcanoes.length == 0) {
        isEmpty = true;
    }
    res.render("catalog", { volcanoes, isEmpty });
})

homeRouter.get("/catalog/:id", async(req, res) => {
    let volcanoId = req.params.id;
    let user = req.user;
    let isValid = await checkVolcanoId(volcanoId);
    if (!isValid) {
        res.render("404");
        return;
    }
    let volcano = await getVolcanoById(volcanoId).lean();
    volcano.voteCount = volcano.voteList.length;
    if (user) {
        volcano.isOwner = user._id.toString() == volcano.ownerId.toString();
        volcano.isLiked = Boolean(volcano.voteList.find(el => el.toString() == user._id.toString()));
    }
    res.render("details", { volcano });
})

homeRouter.get("/volcanoes/search", async(req, res) => {
    let volcanoes = await getAllVolcanoes().lean();
    let isEmpty = false;
    if (volcanoes.length == 0) {
        isEmpty = true;
    }
    res.render("search", { volcanoes, isEmpty });
})

homeRouter.get("/search?*", async(req, res) => {
    let values = req.query;
    let volcanoes = [];
    volcanoes = await searching(values).lean();
    let isEmpty = false;
    if (volcanoes.length == 0) {
        isEmpty = true;
    }
    res.render("search", { volcanoes, isEmpty });
})
module.exports = {
    homeRouter
}