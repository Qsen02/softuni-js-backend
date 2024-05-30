const mongoose = require("mongoose");

const moviesSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    genre: {
        type: String,
        require: true
    },
    director: {
        type: String,
        require: true
    },
    year: {
        type: Number,
        require: true,
        min: [1, "min number must be 1"],
        max: [2024, "max number must be 2024"]
    },
    imageURL: String,
    rating: {
        type: Number,
        require: true,
        min: [1, "min number must be 1"],
        max: [5, "max number must be 5"]
    },
    description: {
        type: String,
        require: true,
        maxLength: [50, "description must be max 50 characters"]
    },
    casts: {
        type: [Object],
        ref: "Casts"
    }
})

let Movies = mongoose.model("Movies", moviesSchema);

module.exports = {
    Movies
}