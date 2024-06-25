function errorParser(err) {
    if (err instanceof Error) {
        if (!err.errors) {
            err.errors = [err.message];
        } else {
            let error = new Error("Input error");
            error.errors = Object.values(err.errors).map(el => el.message).join("\n");
            return error;
        }
    } else if (Array.isArray(err)) {
        let error = new Error("Input error");
        error.errors = err.map(el => el.msg).join("\n");
        return error;
    }
    return err;
}

module.exports = {
    errorParser
}