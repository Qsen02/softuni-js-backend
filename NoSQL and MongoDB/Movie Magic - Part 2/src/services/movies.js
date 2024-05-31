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

function searching(values) {
    if (values.year == "") {
        values.year = 0;
    }
    if (values.title == "" && values.genre == "" && values.year == 0) {
        let results = Movies.find();
        return results;
    }
    let results = Movies.find(values);
    return results;
}

module.exports = {
    getMovies,
    getMovieById,
    createMovie,
    searching
}