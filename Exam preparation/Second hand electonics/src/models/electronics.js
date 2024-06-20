const mongoose = require("mongoose");

const electronicSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    damages: {
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
    production: {
        type: Number,
        require: true
    },
    exploitation: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    buyingList: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Users",
        default: []
    },
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users"
    }
})

const Electronics = mongoose.model("Electronics", electronicSchema);

module.exports = {
    Electronics
}