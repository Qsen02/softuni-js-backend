const express = require("express");
const { session } = require("../middlewares/session");
const { setCors } = require("../middlewares/cors");

function expressConfig(app) {
    app.use(setCors());
    app.use(session());
    app.use(express.json());
}

module.exports = {
    expressConfig
}