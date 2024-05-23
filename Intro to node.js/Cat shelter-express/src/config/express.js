let express = require("express");

function configExpress(app) {
    app.use("/content", express.static("content"));
    app.use(express.urlencoded({ extended: true }));
}

module.exports = { configExpress };