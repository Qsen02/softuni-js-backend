const { Router } = require("express");
const { isUser } = require("../middlewares/guards");
const { createStone, checkStoneId, getStoneById, editStone, deleteStone, liking } = require("../services/stones");
const { errorParser } = require("../util");

const stonesRouter = Router();

stonesRouter.get("/create", isUser(), (req, res) => {
    res.render("create");
})

stonesRouter.post("/create", isUser(), async(req, res) => {
    let userId = req.user._id;
    let fields = req.body;
    try {
        await createStone(fields, userId);
        res.redirect("/catalog");
    } catch (err) {
        res.render("create", { errors: errorParser(err).errors, fields });
        return;
    }
})

stonesRouter.get("/edit/:id", isUser(), async(req, res) => {
    let stoneId = req.params.id;
    let isValid = await checkStoneId(stoneId);
    if (!isValid) {
        res.render("404");
        return;
    }
    let stone = await getStoneById(stoneId).lean();
    res.render("edit", { stone });
})

stonesRouter.post("/edit/:id", isUser(), async(req, res) => {
    let stoneId = req.params.id;
    let isValid = await checkStoneId(stoneId);
    if (!isValid) {
        res.render("404");
        return;
    }
    let fields = req.body;
    let userId = req.user._id;
    let stone = await getStoneById(stoneId).lean();
    try {
        let newStone = await editStone(stoneId, fields, userId);
        res.redirect(`/details/${newStone._id.toString()}`);
    } catch (err) {
        res.render("edit", { errors: errorParser(err).errors, stone });
        return;
    }
});

stonesRouter.get("/delete/:id", async(req, res) => {
    let stoneId = req.params.id;
    let isValid = await checkStoneId(stoneId);
    if (!isValid) {
        res.render("404");
        return;
    }
    await deleteStone(stoneId);
    res.redirect("/catalog");
});

stonesRouter.get("/like/:id", async(req, res) => {
    let stoneId = req.params.id;
    let isValid = await checkStoneId(stoneId);
    if (!isValid) {
        res.render("404");
        return;
    }
    await liking(req.user, stoneId);
    res.redirect(`/details/${stoneId}`);
})

module.exports = {
    stonesRouter
}