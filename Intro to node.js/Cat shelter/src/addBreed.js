const { URLSearchParams } = require("url");
const { readBreeds, writeBreeds } = require("../handlers/model");
const { readTemplate, layoutParser } = require("../handlers/utils");

async function showBreedForm(req, res) {
    let content = await readTemplate("./views/addBreed.html");
    res.writeHead(200, [
        "Content-type", "text/html"
    ]);
    res.write(await layoutParser(content, false));
    res.end();
}

async function onAddBreed(req, res) {
    let breedArray = await readBreeds();
    let body = "";
    req.on("data", chunk => {
        body += chunk.toString();
    })
    req.on("end", chunk => {
        let newBreed = new URLSearchParams(body);
        let breed = newBreed.get("breed");
        if (breed) {
            breedArray.push({ name: breed });
            writeBreeds(breedArray);
        }
    })
    res.writeHead(302, [
        "Location", "/"
    ]);
    res.end();
}
module.exports = {
    showBreedForm,
    onAddBreed
}