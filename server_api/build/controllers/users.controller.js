"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = exports.signup = exports.userProfile = exports.userList = void 0;
const users_queries_1 = require("../queries/users.queries");
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const { CREATED, NOT_ACCEPTABLE } = http_status_codes_1.default;
const upload = multer_1.default({
    storage: multer_1.default.diskStorage({
        destination: (_, __, cb) => {
            cb(null, path_1.default.join(__dirname, '../../public/images/avatars'));
        },
        filename: (_, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        },
    }),
});
const userList = async (req, res, next) => {
    try {
        const search = req.query.search;
        const users = await users_queries_1.searchUsersPerUsername(search);
        res.render('includes/search-menu', { users });
    }
    catch (e) {
        next(e);
    }
};
exports.userList = userList;
const userProfile = async (req, _res, next) => {
    try {
        const username = req.params.username;
        const user = await users_queries_1.findUserPerUsername(username);
        if (user) {
        }
        else {
        }
    }
    catch (e) {
        next(e);
    }
};
exports.userProfile = userProfile;
const signup = async (req, res) => {
    const body = req.body;
    try {
        await users_queries_1.createUser(body);
        res.status(CREATED).end();
    }
    catch (e) {
        res.status(NOT_ACCEPTABLE).json({
            error: e,
        });
    }
};
exports.signup = signup;
exports.uploadImage = [
    upload.single('avatar'),
    async (req, res, next) => {
        try {
            const user = req.user;
            if (user) {
                user.avatar = `/images/avatars/${req.file.filename}`;
                await user.save();
                res.redirect('/');
            }
            else {
                res.end();
            }
        }
        catch (e) {
            next(e);
        }
    },
];
