const mongoose = require("mongoose");

const moviesSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    genre: {
        type: String,
        require: true,
        lowercase: true
    },
    director: {
        type: String,
        require: true
    },
    year: {
        type: Number,
        require: true,
        min: [1878, "min number must be 1878"],
        max: [2034, "max number must be 2034"]
    },
    imageURL: {
        type: String,
        require: true,
        validator(value) {
            return /^https?:\/\//.test(value)
        },
        message: (props) => `${props.value} is not valid URL!`
    },

    rating: {
        type: Number,
        require: true,
        min: [1, "min number must be 1"],
        max: [5, "max number must be 5"]
    },
    description: {
        type: String,
        require: true,
        maxLength: [1000, "description must be max 1000 characters"]
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