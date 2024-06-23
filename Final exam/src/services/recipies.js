const { Recipies } = require("../models/recipies");

function getAllRecipies() {
    let data = Recipies.find();
    return data;
}

function getRecipieById(id) {
    let data = Recipies.findById(id);
    return data;
}

function lastThreeRecipies() {
    let data = Recipies.find().sort({ $natural: -1 }).limit(3);
    return data;
}

async function createRecipie(data, user) {
    let newData = new Recipies(data);
    newData.owner = user._id;
    await newData.save();
    return newData;
}

async function deleteRecipie(id) {
    await Recipies.findByIdAndDelete(id);
}

async function editRecipie(id, data) {
    await Recipies.findByIdAndUpdate(id, { $set: data });
}

async function checkRecipieId(id) {
    let data = await Recipies.find().lean();
    let isValid = data.find(el => el._id == id);
    if (!isValid) {
        return false;
    }
    return true;
}

async function recommending(recipieId, user) {
    await Recipies.findByIdAndUpdate(recipieId, { $push: { recommendList: user._id } });
}

function searching(query) {
    let results = Recipies.find({ title: new RegExp(query.title, "i") });
    return results;
}

module.exports = {
    getAllRecipies,
    getRecipieById,
    lastThreeRecipies,
    createRecipie,
    editRecipie,
    deleteRecipie,
    checkRecipieId,
    recommending,
    searching
}