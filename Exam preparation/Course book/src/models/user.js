const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    courseList: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Courses",
        default: []
    }
}, {
    collation: {
        locale: "en",
        strength: 2
    }
})

const Users = mongoose.model("Users", userSchema);

module.exports = {
    Users
}