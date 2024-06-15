const { Stones } = require("../models/stones");
const { Users } = require("../models/users");

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

async function createStone(data, userId) {
    let user = await Users.findById(userId).lean();
    let newStone = new Stones({
        name: data.name,
        category: data.category,
        location: data.location,
        formula: data.formula,
        description: data.description,
        image: data.image,
        ownerId: user._id,
        color: data.color
    })
    await newStone.save();
    return newStone;
}

async function deleteStone(id) {
    await Stones.findByIdAndDelete(id);
}

async function editStone(id, data, userId) {
    let user = await Users.findById(userId).lean();
    let newStone = new Stones({
        name: data.name,
        category: data.category,
        location: data.location,
        formula: data.formula,
        description: data.description,
        image: data.image,
        ownerId: user._id,
        color: data.color
    })
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