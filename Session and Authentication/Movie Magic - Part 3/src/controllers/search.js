const { getMovies, searching } = require("../services/movies");
const { getUserData } = require("../services/users");

async function showSerchMenu(req, res) {
    let user = req.session.user;
    let movies = await getMovies().lean();
    let hasMovies = true;
    if (movies.length == 0) {
        hasMovies = false;
    }
    if (user) {
        let userData = await getUserData(user.email).lean();
        let userDataId = userData._id.toString();
        for (let movie of movies) {
            if (userDataId == movie.creatorId) {
                movie.userDataId = true;
            } else {
                movie.userDataId = false;
            }
        }
    }
    res.render("search", { movies, hasMovies, user })
}

async function onSearch(req, res) {
    let user = req.session.user;
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
    let movies = await searching(valuesObj).lean();
    let hasMovies = true;
    if (movies.length == 0) {
        hasMovies = false;
    }
    if (user) {
        let userData = await getUserData(user.email).lean();
        let userDataId = userData._id.toString();
        for (let movie of movies) {
            if (userDataId == movie.creatorId) {
                movie.userDataId = true;
            } else {
                movie.userDataId = false;
            }
        }
    }
    res.render("search", { movies, hasMovies, user })
}

module.exports = {
    showSerchMenu,
    onSearch
}