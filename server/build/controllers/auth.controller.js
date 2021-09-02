"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = void 0;
const passport_1 = __importDefault(require("passport"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const { OK, UNAUTHORIZED } = http_status_codes_1.default;
const login = (req, res, next) => {
    passport_1.default.authenticate('local', (err, user, info) => {
        if (err) {
            next(err);
        }
        else if (!user) {
            res.status(UNAUTHORIZED).json({
                error: info,
            });
        }
        else {
            req.login(user, (err) => {
                if (err) {
                    next(err);
                }
                else {
                    res.status(OK).end();
                }
            });
        }
    })(req, res, next);
};
exports.login = login;
const logout = (req, res) => {
    req.logout();
    res.status(OK).end();
};
exports.logout = logout;
