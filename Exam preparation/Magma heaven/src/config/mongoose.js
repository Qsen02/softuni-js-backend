const mongoose = require("mongoose");
const { Users } = require("../models/user");
const { Volcano } = require("../models/volcano");

async function runDB() {
    await mongoose.connect("mongodb://localhost:27017/volcano-heaven");
    console.log("Database is running...");
}

module.exports = {
    runDB
}