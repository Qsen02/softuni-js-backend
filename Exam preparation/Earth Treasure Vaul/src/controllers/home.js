const { getAllStones } = require("../services/stones");

async function showHome(req, res) {
    let stones = await getAllStones().lean();
    let latestStones = [];
    let isStones = false;
    if (stones.length > 0) {
        isStones = true;
        for (let i = stones.length - 1; i >= stones.length - 3; i--) {
            latestStones.push(stones[i]);
        }
    }
    res.render("home", { latestStones, isStones });
}

module.exports = {
    showHome
}