let mongoose = require("mongoose");
const { Movies } = require("../models/movies");
const { Users } = require("../models/users");
const { Casts } = require("../models/casts");

async function main() {
    await mongoose.connect("mongodb://localhost:27017/moviesdb");
    console.log("Database connected");
}
module.exports = {
    main
}