const { Animals } = require("../models/Animals");

function getAllAnimals() {
    let data = Animals.find();
    return data;
}

function getLatestAnimals() {
    let data = Animals.find().sort({ $natural: -1 }).limit(3);
    return data
}

function getAnimalById(id) {
    let data = Animals.findById(id);
    return data;
}

async function createAnimal(data, user) {
    let newData = new Animals(data);
    newData.owner = user._id;
    await newData.save();
    return newData;
}

async function deleteAnimal(id) {
    await Animals.findByIdAndDelete(id);
}

async function editAnimal(id, data) {
    await Animals.findByIdAndUpdate(id, { $set: data });
}

async function checkAnimalId(id) {
    let data = await Animals.find().lean();
    let isValid = data.find(el => el._id == id);
    if (!isValid) {
        return false;
    }
    return true;
}

function searching(query) {
    let results = Animals.find({ location: new RegExp(query.location, "i") });
    return results;
}

async function donating(animalId, user) {
    await Animals.findByIdAndUpdate(animalId, { $push: { donations: user._id } });
}

module.exports = {
    getAllAnimals,
    getLatestAnimals,
    getAnimalById,
    createAnimal,
    editAnimal,
    deleteAnimal,
    checkAnimalId,
    searching,
    donating
}