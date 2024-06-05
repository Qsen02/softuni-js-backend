let session = require("express-session");

async function sessionConfig(app) {
    app.use(session({
        secret: "My secret",
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false }
    }))
}

module.exports = {
    sessionConfig
}