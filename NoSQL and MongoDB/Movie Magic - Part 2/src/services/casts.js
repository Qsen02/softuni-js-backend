const { Casts } = require("../models/casts");
const { Movies } = require("../models/movies");

function getAllCasts() {
    let data = Casts.find();
    return data;
}

function getCastById(id) {
    let data = Casts.findById(id);
    return data;
}

async function createCast(data) {
    let cast = new Casts(data);
    await cast.save();
    return cast;
}

async function attach(movieId, castData) {
    return await Movies.findByIdAndUpdate(movieId, { $push: { casts: castData } });
}

async function checkCastId(id) {
    let data = await Casts.find();
    let isValid = data.find(el => el._id == id);
    if (isValid) {
        return true;
    }
    return false;
}

module.exports = {
    getAllCasts,
    createCast,
    getCastById,
    attach,
    checkCastId
}