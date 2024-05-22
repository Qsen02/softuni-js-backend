let fsp = require("fs/promises");
let fs = require("fs");
let path = require("path");

let searchBar = `<h1>Cat Shelter</h1>
<form action="/search" method="GET">
    <input name="breed" type="text">
    <button type="submit">Search</button>
</form>`

async function readStaticFile(url) {
    let stream = await fsp.open(path.join("./", url), "r");
    return stream.createReadStream();
}

async function readTemplate(url) {
    let data = await fsp.readFile(path.join("./", url));
    return data.toString();
}

async function layoutParser(body, hasSearch) {
    let layout = await readTemplate("./views/home/layout.html");
    let search = "";

    if (hasSearch) {
        search = searchBar
    }
    layout = layout.replace("%%search%%", search);
    return layout.replace("%%body%%", body);
}

function readImg(url) {
    let img = fs.readFileSync(url);
    return Buffer.from(img);
}
async function addImg(imgName, buffer) {
    await fsp.writeFile(path.join("content", "images", imgName), buffer);
}
async function delImg(imgURL) {
    await fsp.unlink(imgURL.replace("\\", ""));
}
module.exports = {
    readStaticFile,
    readTemplate,
    layoutParser,
    addImg,
    delImg,
    readImg
}