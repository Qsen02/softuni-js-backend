function isUser() {
    return function(req, res, next) {
        let user = req.user;
        if (user) {
            next();
        } else {
            res.redirect("/login");
        }
    }
}

function isGuest() {
    return function(req, res, next) {
        let user = req.user;
        if (user) {
            res.redirect("/catalog");
        } else {
            next();
        }
    }
}

module.exports = {
    isGuest,
    isUser
}