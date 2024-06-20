const mongoose = require("mongoose");
const { Users } = require("../models/user");
const { Electronics } = require("../models/electronics");
const { update } = require("lodash");

async function runDB() {
    await mongoose.connect("mongodb://localhost:27017/Second-hand-electronics");
    console.log("Database is running...");
}

module.exports = {
    runDB
}