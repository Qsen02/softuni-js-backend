const { Movies } = require("../models/movies");

function getMovies() {
    const data = Movies.find();
    return data;
}

function getMovieById(id) {
    let data = Movies.findById(id).populate('casts');
    return data;
}

async function createMovie(newMovie) {
    const movie = new Movies(newMovie);
    await movie.save();
    return movie;
}

function searching({ title, genre, year }) {
    let query = {};
    if (title == "" && genre == "" && year == 0) {
        let results = Movies.find();
        return results;
    }
    if (title) {
        query.title = new RegExp(title, "i");
    }
    if (genre) {
        query.genre = genre.toLowerCase();
    }
    if (year) {
        query.year = year;
    }
    return Movies.find(query);
}

async function checkMovieId(id) {
    let data = await Movies.find();
    let isValid = data.find(el => el._id == id);
    if (isValid) {
        return true;
    }
    return false;
}

async function deleteMovie(id) {
    await Movies.findByIdAndDelete(id);
}

module.exports = {
    getMovies,
    getMovieById,
    createMovie,
    searching,
    checkMovieId,
    deleteMovie
}