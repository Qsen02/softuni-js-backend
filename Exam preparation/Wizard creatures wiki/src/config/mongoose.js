const mongoose = require("mongoose");
const { Users } = require("../models/user");
const { Creatures } = require("../models/creatures");

async function runDB() {
    await mongoose.connect("mongodb://localhost:27017/Wizard-Creatures-Wiki");
    console.log("Database is running...");
}

module.exports = {
    runDB
}