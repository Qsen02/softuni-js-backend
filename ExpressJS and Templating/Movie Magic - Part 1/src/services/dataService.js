let data = require("../../data/movies.json");
let fs = require("fs/promises");
let path = require("path");

function getMovies() {
    return data;
}

function getMovieById(id) {
    let movie = data.find(el => Number(el.id) == Number(id));
    return [movie];
}

async function createMovie(newMovie) {
    let id = data.length + 1;
    newMovie.id = id;
    data.push(newMovie);
    await fs.writeFile(path.join("data", "movies.json"), JSON.stringify(data, null, 2));
    return newMovie;
}

function searching(values) {
    let results = data.filter(el => el.title.includes(values.title) ||
        el.genre.includes(values.genre) ||
        String(el.year).includes(values.year));
    return results;
}

module.exports = {
    getMovies,
    getMovieById,
    createMovie,
    searching
}