const { Courses } = require("../models/courses");

function getAllCourses() {
    let data = Courses.find();
    return data;
}

function getCourseById(id) {
    let data = Courses.findById(id).populate('signUpList').populate('ownerId');
    return data;
}

function getLatestCourses() {
    let data = Courses.find().sort({ $natural: -1 }).limit(3);
    return data;
}

async function createCourse(data, user) {
    let newData = new Courses(data);
    newData.ownerId = user._id;
    await newData.save();
    return newData;
}

async function deleteCourse(id) {
    await Courses.findByIdAndDelete(id);
}

async function editCourse(id, data) {
    await Courses.findByIdAndUpdate(id, { $set: data });
}

async function checkCourseId(id) {
    let courses = await Courses.find();
    let isValid = courses.find(el => el._id == id);
    if (!isValid) {
        return false;
    }
    return true;
}

async function signing(courseId, user) {
    await Courses.findByIdAndUpdate(courseId, { $push: { signUpList: user._id } });
}

function getCreatedCourses(user) {
    let data = Courses.find({ ownerId: user._id });
    return data;
}

async function getSignUpCourses(user) {
    let allCourses = await Courses.find().lean();
    let data = allCourses.filter(el => el.signUpList.map(el => el.toString()).includes(user._id.toString()));
    return data;
}

module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,
    deleteCourse,
    editCourse,
    getLatestCourses,
    checkCourseId,
    signing,
    getCreatedCourses,
    getSignUpCourses
}