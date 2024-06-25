const { verifyToken } = require("../services/token");

function session() {
    return function(req, res, next) {
        let token = req.headers["X-Authorization"];
        if (token) {
            try {
                verifyToken(token);
            } catch (err) {
                res.status(403).json({ message: "Invalid or expired token!" });
            }
        }
        next();
    }
}

module.exports = {
    session
}