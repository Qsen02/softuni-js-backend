const mongoose = require("mongoose");

const recipiesSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    ingredients: {
        type: String,
        require: true
    },
    instructions: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    recommendList: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Users",
        default: []
    },
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users"
    }
})

const Recipies = mongoose.model("Recipies", recipiesSchema);

module.exports = {
    Recipies
}