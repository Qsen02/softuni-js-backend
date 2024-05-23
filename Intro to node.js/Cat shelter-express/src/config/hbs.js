let handlebars = require("express-handlebars");

function confingHbs(app) {
    let hbs = handlebars.create({ extname: ".hbs" });

    app.set("view engine", ".hbs");
    app.engine(".hbs", hbs.engine);
}

module.exports = {
    confingHbs
}