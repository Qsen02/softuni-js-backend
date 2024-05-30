const { getMovies, searching } = require("../services/movies");

async function showSerchMenu(req, res) {
    let movies = await getMovies();
    let hasMovies = true;
    let movieshdb = [];
    if (movies.length == 0) {
        hasMovies = false;
    } else {
        for (let movie of movies) {
            let moviehdb = {};
            moviehdb["id"] = movie._id;
            moviehdb["titlehdb"] = movie.title;
            moviehdb["genrehdb"] = movie.genre;
            moviehdb["descriptionhdb"] = movie.description;
            moviehdb["directorhdb"] = movie.director;
            moviehdb["imageURLhdb"] = movie.imageURL;
            moviehdb["ratinghdb"] = movie.rating;
            moviehdb["yearhdb"] = movie.year;
            movieshdb.push(moviehdb);
        }
    }
    res.render("search", { movieshdb, hasMovies })
}

async function onSearch(req, res) {
    let valueArr = req.url.split("?")[1];
    let values = valueArr.split("&");
    let valuesObj = {};
    for (let value of values) {
        let curValue = value.split("=");
        valuesObj[curValue[0]] = curValue[1];
    }
    if (valuesObj.title.includes("+")) {
        valuesObj.title = valuesObj.title.trim();
        valuesObj.title = valuesObj.title.replaceAll("+", " ");
    }
    if (valuesObj.genre.includes("+")) {
        valuesObj.genre = valuesObj.genre.trim();
        valuesObj.genre = valuesObj.genre.replaceAll("+", " ");
    }
    let movies = await searching(valuesObj);
    let hasMovies = true;
    let movieshdb = [];
    if (movies.length == 0) {
        hasMovies = false;
    } else {
        for (let movie of movies) {
            let moviehdb = {};
            moviehdb["id"] = movie._id;
            moviehdb["titlehdb"] = movie.title;
            moviehdb["genrehdb"] = movie.genre;
            moviehdb["descriptionhdb"] = movie.description;
            moviehdb["directorhdb"] = movie.director;
            moviehdb["imageURLhdb"] = movie.imageURL;
            moviehdb["ratinghdb"] = movie.rating;
            moviehdb["yearhdb"] = movie.year;
            movieshdb.push(moviehdb);
        }
    }
    res.render("search", { movieshdb, hasMovies })
}

module.exports = {
    showSerchMenu,
    onSearch
}