const mongoose = require("mongoose");

const creatureSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    species: {
        type: String,
        require: true
    },
    skinColor: {
        type: String,
        require: true
    },
    eyeColor: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    votes: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Users",
        default: []
    },
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users"
    }
})

const Creatures = mongoose.model("Creatures", creatureSchema);

module.exports = {
    Creatures
}