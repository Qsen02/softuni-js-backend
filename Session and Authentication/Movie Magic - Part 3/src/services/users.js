let bcrypt = require("bcrypt");
const { Users } = require("../models/users");

async function register(email, password) {
    let isUser = await Users.findOne({ email }).lean();
    if (isUser) {
        throw new Error("This user exist already!");
    }
    let hashedPassword = await bcrypt.hash(password, 10);
    let user = new Users({ email, password: hashedPassword });
    await user.save();
    return user;
}

async function login(email, password) {
    let user = await Users.findOne({ email }).lean();
    if (!user) {
        throw new Error("Email or password dont match!");
    }
    let isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) {
        throw new Error("Email or password dont match!");
    }
    return user;
}

module.exports = {
    register,
    login,
}