let express = require("express");
let cookieParser = require("cookie-parser");
const { session } = require("../middlewares/session");

let secret = "super secret cookie";

function expressConfig(app) {
    app.use(cookieParser(secret));
    app.use(session());
    app.use("/static", express.static("static"));
    app.use(express.urlencoded({ extended: true }));
}

module.exports = {
    expressConfig
}