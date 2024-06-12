const mongoose = require("mongoose");

const castsSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minLength: [5, "Name must be at least 5 symbols long!"],
        match: [/^[0-9a-zA-Z ]+$/gi, "Name must be only letters and digits!"]
    },
    age: {
        type: Number,
        require: true,
        min: [1, "Age must be between 1 and 120!"],
        max: [120, "Age must be between 1 and 120!"]
    },
    born: {
        type: String,
        require: true,
        minLength: [10, "Born place must be at least 10 symbols long!"],
        match: [/^[0-9a-zA-Z ]+$/gi, "Born place must be only letters and digits!"]
    },
    nameInMovie: {
        type: String,
        require: true,
        minLength: [5, "Name in movie must be at least 5 symbols long!"],
        match: [/^[0-9a-zA-Z ]+$/gi, "Name in movie must be only letters and digits!"]
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