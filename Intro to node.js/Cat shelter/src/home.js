const { readCats } = require("../handlers/model");
const { readTemplate, layoutParser } = require("../handlers/utils");

function parseCat(cat) {
    return `
<li>
<img src="${cat.imgURL}" alt="Black Cat">
<h3>${cat.catName}</h3>
<p><span>Breed: </span>${cat.breed}</p>
<p><span>Description: </span>${cat.description}</p>
<ul class="buttons">
    <li class="btn edit"><a href="/edit/${cat.id}">Change Info</a></li>
    <li class="btn delete"><a href="/delete/${cat.id}">New Home</a></li>
</ul>
</li>`;
}

async function showHome(req, res) {
    let cats = await readCats();
    let fileContent = await readTemplate("./views/home/index.html");
    let content = fileContent.replace("%%cats%%", cats.map(el => parseCat(el)).join(" "));
    res.writeHead(200, [
        "Content-type", "text/html"
    ]);
    res.write(await layoutParser(content, true));
    res.end();
}

async function onSearch(req, res) {
    let fileContent = await readCats();
    let data = req.url.split("?")[1];
    let breed = data.split("=")[1];
    breed = breed.replaceAll("+", " ");
    let results = fileContent.filter(el => el.breed == breed);
    let htmlContent = await readTemplate("./views/home/index.html");
    if (results.length > 0) {
        content = htmlContent.replace("%%cats%%", results.map(el => parseCat(el)).join(""));
    } else {
        content = htmlContent.replace("%%cats%%", "No results found :(");
    }
    res.writeHead(200, [
        "Content-type", "text/html"
    ])
    res.write(await layoutParser(content, true));
    res.end();
}

module.exports = {
    showHome,
    onSearch
}