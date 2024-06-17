const { Router } = require("express");
const { isUser } = require("../middlewares/guards");
const { body, validationResult } = require("express-validator");
const { errorParser } = require("../util");
const { createCourse, checkCourseId, getCourseById, editCourse, deleteCourse, signing } = require("../services/courses");

const courseRouter = Router();

courseRouter.get("/create", isUser(), (req, res) => {
    res.render("create");
})

courseRouter.post("/create",
    body("title").trim().isLength({ min: 5 }).withMessage("Title must be at least 5 symbols"),
    body("image").trim().isURL({ require_tld: false }).withMessage("Image must be valid URL!"),
    body("description").trim().isLength({ min: 10 }).withMessage("Description must be at least 10 symbols"),
    body("type").trim().isLength({ min: 3 }).withMessage("Type must be at least 3 symbols"),
    body("certificate").trim().isLength({ min: 2 }).withMessage("Certificate must be at least 2 symbols"),
    body("price").trim().isInt({ min: 0 }).withMessage("Price must be positive floating number!"),
    isUser(),
    async(req, res) => {
        let fields = req.body;
        let user = req.user;
        try {
            let results = validationResult(req);
            if (results.errors.length) {
                throw results.errors;
            }
            await createCourse(fields, user);
            res.redirect("/catalog");
        } catch (err) {
            res.render("create", { errors: errorParser(err).errors, fields });
        }
    });

courseRouter.get("/edit/:id", isUser(), async(req, res) => {
    let courseId = req.params.id;
    let isValid = await checkCourseId(courseId);
    if (!isValid) {
        res.render("404");
        return;
    }
    let course = await getCourseById(courseId).lean();
    res.render("edit", { course })
});

courseRouter.post("/edit/:id",
    body("title").trim().isLength({ min: 5 }).withMessage("Title must be at least 5 symbols"),
    body("image").trim().isURL({ require_tld: false }).withMessage("Image must be valid URL!"),
    body("description").trim().isLength({ min: 10 }).withMessage("Description must be at least 10 symbols"),
    body("type").trim().isLength({ min: 3 }).withMessage("Type must be at least 3 symbols"),
    body("certificate").trim().isLength({ min: 2 }).withMessage("Certificate must be at least 2 symbols"),
    body("price").trim().isInt({ min: 0 }).withMessage("Price must be positive floating number!"),
    isUser(),
    async(req, res) => {
        let id = req.params.id;
        let course = req.body;
        let isValid = await checkCourseId(id);
        if (!isValid) {
            res.render("404");
            return;
        }
        try {
            let results = validationResult(req);
            if (results.errors.length) {
                throw results.errors;
            }
            await editCourse(id, course);
            res.redirect(`/details/${id}`);
        } catch (err) {
            res.render("edit", { errors: errorParser(err).errors, course });
            return;
        }
    })

courseRouter.get("/delete/:id", isUser(), async(req, res) => {
    let id = req.params.id;
    let isValid = await checkCourseId(id);
    if (!isValid) {
        res.render("404");
        return;
    }
    await deleteCourse(id);
    res.redirect("/catalog");
});

courseRouter.get("/sign/:id", isUser(), async(req, res) => {
    let courseId = req.params.id;
    let user = req.user;
    let isValid = await checkCourseId(courseId);
    if (!isValid) {
        res.render("404");
        return;
    }
    await signing(courseId, user);
    res.redirect(`/details/${courseId}`);
});

module.exports = {
    courseRouter
}