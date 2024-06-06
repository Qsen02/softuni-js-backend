const express = require("express");
const cookieParser = require("cookie-parser");

const secret = "super secret";

function expressConfig(app) {
    app.use(cookieParser(secret));
    app.use("/static", express.static("static"));
    app.use(express.urlencoded({ extended: true }));
}

module.exports = { expressConfig }