const mongoose = require("mongoose");

const castsSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true,
        min: 1,
        max: 255
    },
    born: {
        type: String,
        require: true
    },
    nameInMovie: {
        type: String,
        require: true
    },
    castImg: {
        type: String,
        reuire: true,
        validator(value) {
            return /^https?:\/\//.test(value)
        },
        message: (props) => `${props.value} is not valid URL!`
    }
})

let Casts = mongoose.model("Casts", castsSchema);

module.exports = {
    Casts
}