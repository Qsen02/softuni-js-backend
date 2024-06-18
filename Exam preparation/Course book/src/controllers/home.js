const { Router } = require("express");
const { getLatestCourses, getAllCourses, checkCourseId, getCourseById, getSignUpCourses, getCreatedCourses } = require("../services/courses");
const { isUser } = require("../middlewares/guards");

const homeRouter = Router();

homeRouter.get("/", async(req, res) => {
    let courses = await getLatestCourses().lean();
    res.render("home", { courses });
})

homeRouter.get("/catalog", async(req, res) => {
    let courses = await getAllCourses().lean();
    res.render("catalog", { courses });
})

homeRouter.get("/details/:id", async(req, res) => {
    let user = req.user;
    let courseId = req.params.id;
    let isValid = await checkCourseId(courseId);
    if (!isValid) {
        res.render("404");
        return;
    }
    let course = await getCourseById(courseId).lean();
    let isEmptyList = false;
    if (user) {
        course.isOwner = course.ownerId._id.toString() == user._id.toString();
        course.isLiked = Boolean(course.signUpList.find(el => el._id.toString() == user._id.toString()));

    }
    if (course.signUpList.length == 0) {
        isEmptyList = true;
    }
    res.render("details", { course, isEmptyList });
});

homeRouter.get("/profile", isUser(), async(req, res) => {
    let user = req.user;
    let userObject = await getSignUpCourses(user).lean();
    let signedCoursesCount = userObject.courseList.length;
    let createdCourses = await getCreatedCourses(user).lean();
    let createdCoursesCount = createdCourses.length;
    res.render("profile", { signedCourses: userObject.courseList, signedCoursesCount, createdCourses, createdCoursesCount });
})

module.exports = {
    homeRouter
}