const { Creatures } = require("../models/creatures");

function getAllCreatures() {
    let data = Creatures.find();
    return data;
}

function getCreatureById(id) {
    let data = Creatures.findById(id).populate('votes').populate('owner');
    return data;
}

async function createCreature(data, user) {
    let newData = new Creatures(data);
    newData.owner = user._id;
    await newData.save();
    return newData;
}

async function deleteCreature(id) {
    await Creatures.findByIdAndDelete(id);
}

async function editCreature(id, data) {
    await Creatures.findByIdAndUpdate(id, { $set: data });
}

async function checkCreatureId(id) {
    let data = await Creatures.find().lean();
    let isValid = data.find(el => el._id == id);
    if (!isValid) {
        return false;
    }
    return true;
}

async function voting(creatureId, user) {
    await Creatures.findByIdAndUpdate(creatureId, { $push: { votes: user._id } });
}

function getMyPosts(user) {
    let posts = Creatures.find({ owner: user._id }).populate("owner");
    return posts;
}

module.exports = {
    getAllCreatures,
    getCreatureById,
    createCreature,
    editCreature,
    deleteCreature,
    checkCreatureId,
    voting,
    getMyPosts
}