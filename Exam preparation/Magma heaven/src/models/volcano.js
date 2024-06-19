const mongoose = require("mongoose");

const volcanoSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    elevation: {
        type: Number,
        require: true
    },
    lastEruption: {
        type: Number,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    typeVolcano: {
        type: String,
        enum: ["Supervolcanoes", "Submarine", "Subglacial", "Mud", "Stratovolcanoes", "Shield"],
        require: true
    },
    description: {
        type: String,
        require: true
    },
    voteList: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Users",
        default: []
    },
    ownerId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users"
    }
})

const Volcano = mongoose.model("Volcano", volcanoSchema);

module.exports = {
    Volcano
}