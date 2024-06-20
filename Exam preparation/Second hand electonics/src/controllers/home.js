const { Router } = require("express");
const { getAllelectronics, checkElectronicsId, getElectronicsById, searching } = require("../services/electronics");
const { isUser } = require("../middlewares/guards");

const homeRouter = Router();

homeRouter.get("/", (req, res) => {
    res.render("home");
})

homeRouter.get("/catalog", async(req, res) => {
    let electronics = await getAllelectronics().lean();
    res.render("catalog", { electronics });
})

homeRouter.get("/catalog/:id", async(req, res) => {
    let offerId = req.params.id;
    let user = req.user;
    let isValid = await checkElectronicsId(offerId);
    if (!isValid) {
        res.render("404");
        return;
    }
    let offer = await getElectronicsById(offerId).lean();
    if (user) {
        offer.isOwner = offer.owner.toString() == user._id.toString();
        offer.isBought = Boolean(offer.buyingList.find(el => el.toString() == user._id.toString()));
    }
    res.render("details", { offer });
})

homeRouter.get("/products/search", isUser(), async(req, res) => {
    let query = req.query;
    let offers = await searching(query).lean();
    res.render("search", { offers, query });
})

module.exports = {
    homeRouter
}