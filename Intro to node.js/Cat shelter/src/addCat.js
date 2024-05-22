const { readBreeds, readCats, writeCats } = require("../handlers/model");
const { readTemplate, layoutParser, addImg, readImg } = require("../handlers/utils");
let formidable = require("formidable");
let path = require("path");

function parseBreed(breed) {
    return `<option value="${breed.name}">${breed.name}</option>`;
}

async function showAddCatFrom(req, res) {
    let breeds = await readBreeds();
    let fileContent = await readTemplate("./views/addCat.html");
    let content = fileContent.replace("%%breed%%", breeds.map(el => parseBreed(el)).join(" "));
    res.writeHead(200, [
        "Content-type", "text/html"
    ])
    res.write(await layoutParser(content, false));
    res.end();
}

async function onCreateCat(req, res) {
    let fileContent = await readCats();
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        console.log(fields);
        let catName = fields.catName[0];
        let description = fields.description[0];
        let id = fileContent.length + 1;
        let imgFile = "";
        let imgPath = "";
        let breed = "unknown";

        if (Object.keys(files).length > 0) {
            imgFile = files.imgURL[0];
            let imgBuffer = readImg(imgFile.filepath);
            let imgName = imgFile.originalFilename;
            addImg(imgName, imgBuffer);
            imgPath = path.join("\\content", "images", imgName);
            breed = fields.breed[0];
        }

        if (catName && description && id) {
            fileContent.push({ catName, imgURL: imgPath, breed, description, id: String(id) });
            writeCats(fileContent);
        }

    })
    res.writeHead(302, [
        "Location", "/"
    ])
    res.end();
}

module.exports = {
    showAddCatFrom,
    onCreateCat
}