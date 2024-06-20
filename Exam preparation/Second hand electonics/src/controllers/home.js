const { Router } = require("express");
const { getAllelectronics, checkElectronicsId, getElectronicsById } = require("../services/electronics");

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

module.exports = {
    homeRouter
}