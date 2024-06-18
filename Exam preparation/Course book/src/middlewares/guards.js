function isUser() {
    return function(req, res, next) {
        if (!req.user) {
            return res.redirect("/login");
        }
        next();
    }
}

function isGuest() {
    return function(req, res, next) {
        if (req.user) {
            return res.redirect("/");
        }
        console.log(req.title);
        next();
    }
}

module.exports = {
    isGuest,
    isUser
}