const mongoose = require("mongoose");
const { Users } = require("../models/user");
const { Furnitures } = require("../models/furnitures");

async function runDB() {
    await mongoose.connect("mongodb://localhost:27017/Furniture-store");
    console.log("Database is running...");
}

module.exports = {
    runDB
}