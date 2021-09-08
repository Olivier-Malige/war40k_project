"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchUsersPerUsername = exports.findUserPerUsername = exports.findUserPerId = exports.findUserPerEmail = exports.createUser = void 0;
const user_model_1 = require("../database/models/user.model");
const createUser = async (user) => {
    try {
        const hashedPassword = await user_model_1.User.hashPassword(user.password);
        const newUser = new user_model_1.User({
            username: user.username,
            local: {
                email: user.email,
                password: hashedPassword,
            },
        });
        return newUser.save();
    }
    catch (e) {
        throw e;
    }
};
exports.createUser = createUser;
const findUserPerEmail = (email) => {
    return user_model_1.User.findOne({ 'local.email': email }).exec();
};
exports.findUserPerEmail = findUserPerEmail;
const findUserPerId = (id) => {
    return user_model_1.User.findById(id).exec();
};
exports.findUserPerId = findUserPerId;
const findUserPerUsername = (username) => {
    return user_model_1.User.findOne({ username }).exec();
};
exports.findUserPerUsername = findUserPerUsername;
const searchUsersPerUsername = (search) => {
    const regExp = `^${search}`;
    const reg = new RegExp(regExp);
    return user_model_1.User.find({ username: { $regex: reg } }).exec();
};
exports.searchUsersPerUsername = searchUsersPerUsername;
