const bcrypt = require("bcrypt");
const { Users } = require("../models/user");

async function register(email, firstname, lastname, password) {
    let userEmail = await Users.findOne({ email }).lean();
    if (userEmail) {
        throw new Error("This user already exists!");
    }
    let userFirstname = await Users.findOne({ firstname }).lean();
    if (userFirstname) {
        throw new Error("This first name already taken!");
    }
    let userLastname = await Users.findOne({ lastname }).lean();
    if (userLastname) {
        throw new Error("This last name already taken!");
    }
    let newUser = new Users({
        email: email,
        firstname: firstname,
        lastname: lastname,
        password: await bcrypt.hash(password, 10)
    });
    await newUser.save();
    return newUser;
}

async function login(email, password) {
    let user = await Users.findOne({ email }).lean();
    if (!user) {
        throw new Error("Password or email don't match!");
    }
    let isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) {
        throw new Error("Password or email don't match!");
    }
    return user;
}

module.exports = {
    register,
    login
}