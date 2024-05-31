let mongoose = require("mongoose");

async function start() {
    await mongoose.connect("mongodb://localhost:27017/cat-shelter");
    console.log("Database is connected");
}

module.exports = {
    start
}