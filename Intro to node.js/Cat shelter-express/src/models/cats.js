let mongoose = require("mongoose");

let catsSchema = new mongoose.Schema({
    name: {
        type: String,
        requrie: true
    },
    description: {
        type: String,
        require: true,
        maxLength: 1000
    },
    imgURL: String,
    breed: {
        type: String,
        require: true,
        lowercase: true
    }
})

let Cats = mongoose.model("Cats", catsSchema);

module.exports = {
    Cats
}