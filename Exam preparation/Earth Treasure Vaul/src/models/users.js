const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
});

let Users = mongoose.model("Users", userSchema);

module.exports = {
    Users
}