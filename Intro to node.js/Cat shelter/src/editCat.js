const { readCats, writeCats, readBreeds } = require("../handlers/model");
const { readTemplate, layoutParser, delImg, addImg, readImg } = require("../handlers/utils");
let path = require("path");
let formidable = require("formidable");

function formContent(data) {
    return `
    <form action="/edit/${data.id}/edit" method="POST" class="cat-form" enctype="multipart/form-data">
    <h2>Edit Cat</h2>
    <label for="name">Name</label>
    <input name="catName" type="text" id="name" value="${data.catName}">
    <label for="description">Description</label>
    <textarea name="description" id="description value="${data.description}">${data.description}</textarea>
    <label for="image">Image</label>
    <input name="imgURL" type="file" id="image">
    <label for="group">Breed</label>
    <select id="group" name="breed">
       <option value="${data.breed}">${data.breed}</option>
       %%option%%
    </select>
    <button type="submit">Edit Cat</button>
    </form>`
}

function optionData(data) {
    return `<option value="${data.name}">${data.name}</option>`;
}

async function showEditForm(req, res) {
    let urlArray = req.url.split("/");
    let id = urlArray[urlArray.length - 1];
    let cats = await readCats();
    let breeds = await readBreeds()
    let cat = cats.find(el => el.id == id);
    let fileContent = await readTemplate("./views/editCat.html");
    fileContent = fileContent.replace("%%form%%", formContent(cat));
    fileContent = fileContent.replace("%%option%%", breeds.map(el => optionData(el)).join(" "));
    res.writeHead(200, [
        "Content-type", "text/html"
    ])
    res.write(await layoutParser(fileContent, false));
    res.end();
}

async function onEdit(req, res) {
    let fileContent = await readCats();
    let urlArr = req.url.split("/");
    let id = urlArr[urlArr.length - 2];
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        let catName = fields.catName[0];
        let description = fields.description[0];
        let imgFile = "";
        let breed = "unknown";
        let imgPath = "";
        let curObj = fileContent.find(el => el.id == id);
        let index = fileContent.indexOf(curObj);

        if (Object.keys(files).length > 0) {
            imgFile = files.imgURL[0];
            let imgBuffer = readImg(imgFile.filepath);
            let imgName = imgFile.originalFilename;
            addImg(imgName, imgBuffer);
            imgPath = path.join("\\content", "images", imgName);
            let delImgPath = curObj.imgURL;
            if (delImgPath != "") {
                delImg(delImgPath);
            }
            breed = fields.breed[0];
        }

        if (catName && description && breed && id) {
            fileContent.splice(index, 1, { catName, imgURL: imgPath, breed, description, id: id });
            writeCats(fileContent);
        }
    })
    res.writeHead(302, [
        "Location", "/"
    ])
    res.end();

}

module.exports = {
    showEditForm,
    onEdit
}