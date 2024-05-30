const { Casts } = require("../models/casts");

async function getAllCasts() {
    let data = await Casts.find({});
    return data;
}

async function createCast(data) {
    let cast = new Casts(data);
    await cast.save();
    return cast;
}

module.exports = {
    getAllCasts,
    createCast
}