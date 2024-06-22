const mongoose = require("mongoose");
const { Users } = require("../models/user");
const { Animals } = require("../models/Animals");

async function runDB() {
    await mongoose.connect("mongodb://localhost:27017/Friendly-world");
    console.log("Database is running...");
}

module.exports = {
    runDB
}