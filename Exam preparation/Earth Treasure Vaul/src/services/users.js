const bcrypt = require("bcrypt");
const { Users } = require("../models/users");

async function register(email, password) {
    let user = await Users.findOne({ email }).lean();
    if (user) {
        throw new Error("This user already exist!");
    }
    let newUser = new Users({
        email: email,
        password: await bcrypt.hash(password, 10)
    })
    await newUser.save();
    return newUser;
}

async function login(email, password) {
    let user = await Users.findOne({ email }).lean();
    if (!user) {
        throw new Error("Email or password don't match!");
    }
    let isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) {
        throw new Error("Email or password don't match!");
    }
    return user;
}

module.exports = {
    register,
    login
}