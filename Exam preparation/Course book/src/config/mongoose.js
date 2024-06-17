const mongoose = require("mongoose");
const { Users } = require("../models/user");
const { Courses } = require("../models/courses");
//TODO set real db name in the exam
async function runDB() {
    await mongoose.connect("mongodb://localhost:27017/course-book-db");
    console.log("Database is running...");
}

module.exports = {
    runDB
}