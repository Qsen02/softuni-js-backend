const mongoose = require("mongoose");

const moviesSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        minLength: [5, "Title must be at least 5 symbols long!"],
        match: [/^[0-9a-zA-Z ]+$/gi, "Title must be only letters and digits!"]
    },
    genre: {
        type: String,
        require: true,
        lowercase: true,
        minLength: [5, "Genre must be at least 5 symbols long!"],
        match: [/^[0-9a-zA-Z ]+$/gi, "Genre must be only letters and digits!"]
    },
    director: {
        type: String,
        require: true,
        minLength: [5, "Director must be at least 5 symbols long!"],
        match: [/^[0-9a-zA-Z ]+$/gi, "Director must be only letters and digits!"]
    },
    year: {
        type: Number,
        require: true,
        min: [1900, "Year must be between 1900 and 2024!"],
        max: [2024, "Year must be between 1900 and 2024!"]
    },
    imageURL: {
        type: String,
        require: true,
        match: /^https?:\/\//
    },

    rating: {
        type: Number,
        require: true,
        min: [1, "Rating must be between 1 and 5!"],
        max: [5, "Rating must be between 1 and 5!"]
    },
    description: {
        type: String,
        require: true,
        minLength: [20, "Description must be between 20 and 1000 symbols!"],
        maxLength: [1000, "Description must be between 20 and 1000 symbols!"]
    },
    creatorId: {
        type: String,
        require: true
    },
    casts: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Casts",
        default: []
    }
})

let Movies = mongoose.model("Movies", moviesSchema);

module.exports = {
    Movies
}