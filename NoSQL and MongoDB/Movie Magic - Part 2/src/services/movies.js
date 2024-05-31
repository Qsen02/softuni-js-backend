const { Movies } = require("../models/movies");

function getMovies() {
    const data = Movies.find();
    return data;
}

function getMovieById(id) {
    let data = Movies.findById(id).populate('casts');
    return data;
}

function createMovie(newMovie) {
    const movie = new Movies(newMovie);
    movie.save();
    return movie.lean();
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

module.exports = {
    getMovies,
    getMovieById,
    createMovie,
    searching
}