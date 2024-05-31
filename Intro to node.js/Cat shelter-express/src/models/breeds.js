let mongoose = require("mongoose");

let breedSchema = new mongoose.Schema({
    breedName: {
        type: String,
        require: true,
        lowercase: true
    }
})

let Breeds = mongoose.model("Breeds", breedSchema);

module.exports = {
    Breeds
}