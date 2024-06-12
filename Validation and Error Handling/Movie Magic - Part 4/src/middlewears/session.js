const { verifyToken } = require("../services/token");

function session() {
    return function(req, res, next) {
        const token = req.cookies.token;
        if (token) {
            try {
                let playload = verifyToken(token);
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