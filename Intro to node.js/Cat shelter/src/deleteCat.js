const { readCats, writeCats } = require("../handlers/model");
const { readTemplate, layoutParser, delImg } = require("../handlers/utils");

function parseCat(cat) {
    return `
    <form action="/delete/${cat.id}/delete" method="GET" class="cat-form">
    <h2>Shelter the cat</h2>
    <img src="${cat.imgURL}" alt="">
    <label for="name">Name</label>
    <input type="text" id="name" value="${cat.catName}" disabled>
    <label for="description">Description</label>
    <textarea id="description" disabled>${cat.description}</textarea>
    <label for="group">Breed</label>
    <select id="group" disabled>
        <option value="${cat.breed}">${cat.breed}</option>
    </select>
    <button>SHELTER THE CAT</button>
</form>`;
}


async function showDeleteForm(req, res) {
    let fileContent = await readCats();
    let url = req.url.split("/");
    let id = url[url.length - 1];
    let curCat = fileContent.find(el => el.id == id);
    let htmlContent = await readTemplate("./views/catShelter.html");
    let content = htmlContent.replace("%%cat%%", parseCat(curCat));
    res.writeHead(200, [
        "Content-type", "text/html"
    ])
    res.write(await layoutParser(content, false));
    res.end();
}

async function onDeleteCat(req, res) {
    let fileContent = await readCats();
    let url = req.url.split("/");
    let id = url[url.length - 2];
    let curCat = fileContent.find(el => el.id == id);
    let imgPath = curCat.imgURL;
    let index = fileContent.indexOf(curCat);
    fileContent.splice(index, 1);
    if (imgPath != "") {
        await delImg(imgPath);
    }
    await writeCats(fileContent);
    res.writeHead(302, [
        "Location", "/"
    ])
    res.end();
}

module.exports = {
    showDeleteForm,
    onDeleteCat
}