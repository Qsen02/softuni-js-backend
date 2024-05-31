let { Breeds } = require("../models/breeds");
let { Cats } = require("../models/cats");

function getAllCats() {
    let data = Cats.find();
    return data;
}

function getAllBreeds() {
    let data = Breeds.find();
    return data;
}

function getCatById(id) {
    let data = Cats.findById(id);
    return data;
}

async function createCat(cat) {
    let newCat = new Cats(cat);
    await newCat.save();
    return newCat;
}

async function createBreed(breed) {
    let newBreed = new Breeds(breed);
    await newBreed.save();
    return breed;
}

async function deleteCat(id) {
    await Cats.findByIdAndDelete(id);
}

async function editCat(id, catData) {
    await Cats.findByIdAndUpdate(id, { $set: catData });
}

function searching(value) {
    let curValue = value.toLowerCase();
    let results = Cats.find({ breed: curValue });
    return results;
}

module.exports = {
    getAllBreeds,
    getAllCats,
    getCatById,
    createBreed,
    createCat,
    deleteCat,
    editCat,
    searching,
}