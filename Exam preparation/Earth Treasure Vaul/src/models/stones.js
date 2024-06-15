const mongoose = require("mongoose");

let stonesSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minLength: [2, "Name must be at least 2 letters long!"]
    },
    category: {
        type: String,
        require: true,
        minLength: [3, "Category must be at least 3 letters long!"]
    },
    color: {
        type: String,
        require: true,
        minLength: [2, "Name must be at least 2 letters long!"]
    },
    image: {
        type: String,
        require: true,
        match: /^https?:\/\//
    },
    location: {
        type: String,
        require: true,
        minLength: [5, "Location must be between 5 and 15 letters long!"],
        maxLength: [15, "Location must be between 5 and 15 letters long!"]
    },
    formula: {
        type: String,
        require: true,
        minLength: [3, "Formula must be between 3 and 30 letters long!"],
        maxLength: [30, "Formula must be between 3 and 30 letters long!"]
    },
    description: {
        type: String,
        require: true,
        minLength: [10, "Description must be at least 10 letters long!"],
    },
    likedList: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Users",
        default: []
    },
    ownerId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users",
        default: {}
    }
})

let Stones = mongoose.model("Stones", stonesSchema);

module.exports = {
    Stones
}