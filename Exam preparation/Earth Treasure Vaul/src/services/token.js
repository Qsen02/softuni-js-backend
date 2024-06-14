const jwt = require("jsonwebtoken");

let secret = "super secret token"

function setToken(user) {
    let playload = {
        email: user.email,
        _id: user._id
    }

    let token = jwt.sign(playload, secret, { expiresIn: "3d" });

    return token;
}

function checkToken(token) {
    let isValid = jwt.verify(token, secret);

    return isValid;
}

module.exports = {
    checkToken,
    setToken
}