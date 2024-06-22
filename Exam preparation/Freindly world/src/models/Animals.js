const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    years: {
        type: Number,
        require: true
    },
    kind: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    need: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    donations: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Users",
        default: []
    },
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users"
    }
})

const Animals = mongoose.model("Animals", animalSchema);

module.exports = {
    Animals
}