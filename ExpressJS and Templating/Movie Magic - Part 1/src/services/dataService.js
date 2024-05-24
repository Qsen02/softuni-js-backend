let fs = require("fs/promises");
let path = require("path");

async function readData() {
    let data = await fs.readFile(path.join("data", "movies.json"));
    return JSON.parse(data);
}

async function writeData(data) {
    await fs.writeFile(path.join("data", "movies.json"), JSON.stringify(data, null, 2));
}

async function getMovies() {
    let data = await readData();
    return data;
}

async function getMovieById(id) {
    let data = await readData();
    let movie = data.find(el => el.id == id);
    return movie;
}

async function createMovie(newMovie) {
    let data = await readData();
    let id = "xxx-xxx-xxx".replace(/x/g, () => (Math.random() * 16 | 0).toString(16));
    newMovie.id = id;
    data.push(newMovie);
    await writeData(data);
    return newMovie;
}

async function searching(values) {
    let data = await readData();
    if (values.year == "") {
        values.year = 0;
    }
    if (values.title == "" && values.genre == "" && values.year == 0) {
        return data;
    }
    let results = data.filter(el =>
        el.title.toLowerCase() == values.title.toLowerCase() ||
        el.genre.toLowerCase() == values.genre.toLowerCase() ||
        el.year == values.year
    );
    return results;
}

module.exports = {
    getMovies,
    getMovieById,
    createMovie,
    searching
}