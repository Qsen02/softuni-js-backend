const { readStaticFile } = require("./utils");

async function getFileType(req, res) {
    if (req.url.endsWith(".css")) {
        let content = await readStaticFile(req.url);
        res.writeHead(200, [
            "Content-type", "text/css"
        ]);
        content.pipe(res);
        return true;
    } else if (req.url.endsWith(".ico")) {
        let content = await readStaticFile(req.url);
        res.writeHead(200, [
            "Content-type", "image/svg+xml"
        ])
        content.pipe(res);
        return true;
    } else if (req.url.endsWith(".jpg") || req.url.endsWith(".png") || req.url.endsWith(".webpg")) {
        debugger
        let content = await readStaticFile(req.url);
        res.writeHead(200, [
            "Content-type", "image/jpg"
        ]);
        content.pipe(res);
        return true;
    }
    return false;
}

module.exports = {
    getFileType
}