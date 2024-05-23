let fs = require("fs/promises");
let path = require("path");

async function readData() {
    let data = await fs.readFile(path.join("data", "data.json"));
    return JSON.parse(data);
}

async function writeData(data) {
    await fs.writeFile(path.join("data", "data.json"), JSON.stringify(data, null, 2));
}

async function getAllCats() {
    let data = await readData();
    return data.cats;
}

async function getAllBreeds() {
    let data = await readData();
    return data.breeds;
}

async function getCatById(id) {
    let data = await readData();
    let curCat = data.cats.find(el => el.id == id);
    return curCat;
}

async function createCat(cat) {
    let data = await readData();
    let id = "xxx-xxx-xxx".replace(/x/g, () => (Math.random() * 16 | 0).toString(16));
    cat.id = id;
    data.cats.push(cat);
    await writeData(data);
    return cat;
}

async function createBreed(breed) {
    let data = await readData();
    data.breeds.push(breed);
    await writeData(data);
    return breed;
}

async function deleteCat(id) {
    let data = await readData();
    let cat = data.cats.find(el => el.id == id);
    let index = data.cats.indexOf(cat);
    data.cats.splice(index, 1);
    await writeData(data);
    return cat;
}

async function editCat(id, catData) {
    let data = await readData();
    let cat = data.cats.find(el => el.id == id);
    cat.breed = catData.breed;
    cat.description = catData.description;
    cat.name = catData.name;
    await writeData(data);
    return cat;
}

async function searching(value) {
    let data = await readData();
    let curValue = value.toLowerCase();
    let results = data.cats.filter(el => el.breed.toLowerCase().includes(curValue));
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