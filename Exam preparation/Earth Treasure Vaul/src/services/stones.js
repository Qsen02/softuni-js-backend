const { Stones } = require("../models/stones");

function getAllStones() {
    let stones = Stones.find();
    return stones;
}

function getStoneById(id) {
    let stone = Stones.findById(id);
    return stone;
}

function getLatestStones() {
    let latestStones = Stones.find().sort({ $natural: -1 }).limit(3);
    return latestStones
}

async function createStone(data, user) {
    let newStone = new Stones(data);
    newStone.ownerId = user._id;
    await newStone.save();
    return newStone;
}

async function deleteStone(id) {
    await Stones.findByIdAndDelete(id);
}

async function editStone(id, data, user) {
    let newStone = new Stones(data);
    newStone.ownerId = user._id;
    await Stones.findByIdAndDelete(id);
    await newStone.save();
    return newStone;
}

async function checkStoneId(id) {
    let stones = await Stones.find();
    let isValid = stones.find(el => el._id == id);
    if (!isValid) {
        return false;
    }
    return true;
}

function searching(query) {
    let results = Stones.find({ name: RegExp(query, "i") });
    return results;
}

async function liking(user, stoneId) {
    await Stones.findByIdAndUpdate(stoneId, { $push: { likedList: user._id } });
}

module.exports = {
    getAllStones,
    getStoneById,
    createStone,
    deleteStone,
    editStone,
    checkStoneId,
    getLatestStones,
    searching,
    liking
}