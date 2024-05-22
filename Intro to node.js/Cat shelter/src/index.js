let http = require("http");
const { getFileType } = require("../handlers/fileHandler.js");
const { showHome, onSearch } = require("./home.js");
const { showBreedForm, onAddBreed } = require("./addBreed.js");
const { showAddCatFrom, onCreateCat } = require("./addCat.js");
const { showEditForm, onEdit } = require("./editCat.js");
const { showDeleteForm, onDeleteCat } = require("./deleteCat.js");

let routes = {
    GET: {
        "/": showHome,
        "/home": showHome,
        "/cats/add-breed": showBreedForm,
        "/cats/add-cat": showAddCatFrom,
        "/search": onSearch,
    },
    POST: {
        "/cats/add-breed/post": onAddBreed,
        "/cats/add-cat/post": onCreateCat,
    }
}

http.createServer(async(req, res) => {
    if (req.url === "/favicon.ico") {
        return;
    }
    let url = req.url;
    if (req.method === "GET" && url.includes("search")) {
        url = "/search";
    }
    if (/[\d]/.test(url)) {
        let array = url.split("/");
        if ((array.length - 1) >= 0) {
            let id = array[array.length - 1];
            routes.GET[`/edit/${id}`] = showEditForm;
            routes.POST[`/edit/${id}/edit`] = onEdit
            routes.GET[`/delete/${id}`] = showDeleteForm;
            routes.GET[`/delete/${id}/delete?`] = onDeleteCat;
        }
    }
    if (await getFileType(req, res)) {
        return;
    } else if (url in routes[req.method]) {
        console.log(url);
        await routes[req.method][url](req, res);
        return;
    }
    res.writeHead("404", [
        "Content-type", "text/plaint"
    ]);
    res.write("Status 404 page not found!");
    res.end();
}).listen(3000)