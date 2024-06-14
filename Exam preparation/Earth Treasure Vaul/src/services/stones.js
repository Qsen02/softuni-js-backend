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
    await newStone.save();
    await Stones.findByIdAndDelete(id);
    return newStone;
}

module.exports = {
    getAllStones,
    getStoneById,
    createStone,
    deleteStone,
    editStone
}