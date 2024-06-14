const mongoose = require("mongoose");
const { Users } = require("../models/users");
const { Stones } = require("../models/stones");

async function runDatabase() {
    await mongoose.connect("mongodb://localhost:27017/Earth-treasure");
    console.log("Database connected");
}

module.exports = {
    runDatabase
}