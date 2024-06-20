const { Electronics } = require("../models/electronics");

function getAllelectronics() {
    let data = Electronics.find();
    return data;
}

function getElectronicsById(id) {
    let data = Electronics.findById(id);
    return data;
}

async function createElectronics(data, user) {
    let newData = new Electronics(data);
    newData.owner = user._id;
    await newData.save();
    return newData;
}

async function deleteElectronics(id) {
    await Electronics.findByIdAndDelete(id);
}

async function editElectronics(id, data) {
    await Electronics.findByIdAndUpdate(id, { $set: data });
}

async function checkElectronicsId(id) {
    let data = await Electronics.find().lean();
    let isValid = data.find(el => el._id == id);
    if (!isValid) {
        return false;
    }
    return true;
}

async function buyElectronics(offerId, user) {
    await Electronics.findByIdAndUpdate(offerId, { $push: { buyingList: user._id } });
}

function searching(values) {
    let query = {};
    if (values.name) {
        query.name = new RegExp(values.name, "i");
    }
    if (values.type) {
        query.type = new RegExp(values.type, "i");
    }
    let data = Electronics.find(query);
    return data;
}

module.exports = {
    getAllelectronics,
    getElectronicsById,
    createElectronics,
    deleteElectronics,
    editElectronics,
    checkElectronicsId,
    buyElectronics,
    searching
}