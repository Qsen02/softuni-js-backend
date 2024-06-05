let mongoose = require("mongoose");

async function main() {
    await mongoose.connect("mongodb://localhost:27017/moviesdb");
    console.log("Database connected");
}
module.exports = {
    main
}