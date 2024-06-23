const mongoose = require("mongoose");
const { Users } = require("../models/user");
const { Recipies } = require("../models/recipies");

async function runDB() {
    await mongoose.connect("mongodb://localhost:27017/Home-cooking-recipies");
    console.log("Database is running...");
}

module.exports = {
    runDB
}