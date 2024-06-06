let bcrypt = require("bcrypt");
const { Users } = require("../models/users");

async function register(email, password, repass) {
    let isUser = await Users.findOne({ email }).lean();
    if (!email || !password) {
        throw new Error("All fields required!");
    }
    if (password.length < 6) {
        throw new Error("Password must be at least 6 symbols!");
    }
    if (password != repass) {
        throw new Error("Password must match!");
    }
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
        return false;
    }
    let isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) {
        return false;
    }
    return user;
}

function getUserData(email) {
    let user = Users.findOne({ email });
    if (!user) {
        return false;
    }
    return user;
}

module.exports = {
    register,
    login,
    getUserData
}