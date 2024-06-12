const mongoose = require("mongoose");

const castsSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    age: {
        type: Number,
        require: true,
    },
    born: {
        type: String,
        require: true,
    },
    nameInMovie: {
        type: String,
        require: true,
    },
    castImg: {
        type: String,
        reuire: true,
    }
})

let Casts = mongoose.model("Casts", castsSchema);

module.exports = {
    Casts
}