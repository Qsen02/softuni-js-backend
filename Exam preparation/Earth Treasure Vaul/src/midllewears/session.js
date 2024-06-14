const { checkToken } = require("../services/token");

function session() {
    return function(req, res, next) {
        let token = req.cookies.token;

        if (token) {
            try {
                let playload = checkToken(token);
                req.user = playload;
                res.locals.user = true;
            } catch (err) {
                res.clearCookie("token");
            }
        }
        next();
    }
}

module.exports = {
    session
}