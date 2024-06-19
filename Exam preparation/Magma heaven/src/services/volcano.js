const { Volcano } = require("../models/volcano");

function getAllVolcanoes() {
    let data = Volcano.find();
    return data;
}

function getVolcanoById(id) {
    let data = Volcano.findById(id);
    return data;
}

async function createVolcano(data, user) {
    let newData = new Volcano(data);
    newData.ownerId = user._id;
    await newData.save();
    return newData;
}

async function deleteVolcano(id) {
    await Volcano.findByIdAndDelete(id);
}

async function editVolcano(id, data) {
    await Volcano.findByIdAndUpdate(id, { $set: data });
}

async function checkVolcanoId(id) {
    let data = await Volcano.find().lean();
    let isValid = data.find(el => el._id == id);
    if (!isValid) {
        return false;
    }
    return true;
}

async function voting(volcanoId, user) {
    await Volcano.findByIdAndUpdate(volcanoId, { $push: { voteList: user._id } });
}

function searching(values) {
    let query = {};
    if (values.name) {
        query.name = new RegExp(values.name, "i");
    }
    if (values.typeVolcano) {
        query.typeVolcano = values.typeVolcano;
    }
    let data = Volcano.find(query);
    return data;
}

module.exports = {
    getAllVolcanoes,
    getVolcanoById,
    createVolcano,
    editVolcano,
    deleteVolcano,
    checkVolcanoId,
    voting,
    searching
}