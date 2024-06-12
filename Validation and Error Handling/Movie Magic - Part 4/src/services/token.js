let jwt = require("jsonwebtoken");

let secret = "jwt secret";

function setToken(user) {
    let playload = {
        _id: user._id,
        email: user.email
    }
    let token = jwt.sign(playload, secret, { expiresIn: "3d" });

    return token;
}

function verifyToken(token) {
    let playload = jwt.verify(token, secret);

    return playload;
}

module.exports = {
    setToken,
    verifyToken
}