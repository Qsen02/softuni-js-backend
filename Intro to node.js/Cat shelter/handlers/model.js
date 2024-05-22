let fs = require("fs/promises");

async function readJsonFile(url) {
    let data = await fs.readFile(url);
    data = JSON.parse(data);
    return data;
}

async function writeJsonFile(url, data) {
    await fs.writeFile(url, JSON.stringify(data, null, 2));
}

async function readCats() {
    return await readJsonFile("./data/cats.json");
}
async function writeCats(data) {
    await writeJsonFile("./data/cats.json", data);
}

async function readBreeds() {
    return await readJsonFile("./data/breeds.json");
}
async function writeBreeds(data) {
    await writeJsonFile("./data/breeds.json", data);
}

module.exports = {
    readCats,
    writeCats,
    readBreeds,
    writeBreeds
}