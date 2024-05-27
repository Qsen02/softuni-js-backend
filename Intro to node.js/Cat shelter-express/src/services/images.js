let fs = require("fs/promises");
let path = require("path");

async function delFile(name) {
    await fs.unlink(path.join("content", "images", `${name}`));
}

async function delImg(imgName) {
    await delFile(imgName);
}

module.exports = {
    delImg
}