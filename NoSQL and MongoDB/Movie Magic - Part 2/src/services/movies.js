const { Movies } = require("../models/movies");

async function getMovies() {
    const data = await Movies.find({});
    return data;
}

async function getMovieById(id) {
    let data = await Movies.findById(id);
    return data;
}

async function createMovie(newMovie) {
    const movie = new Movies(newMovie);
    await movie.save();
    return movie;
}

async function searching(values) {
    if (values.year == "") {
        values.year = 0;
    }
    if (values.title == "" && values.genre == "" && values.year == 0) {
        let results = await Movies.find({});
        return results;
    }
    let results = await Movies.find(values);
    return results;
}

module.exports = {
    getMovies,
    getMovieById,
    createMovie,
    searching
}