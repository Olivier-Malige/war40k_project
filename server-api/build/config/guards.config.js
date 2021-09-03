"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const { UNAUTHORIZED, getStatusText } = http_status_codes_1.default;
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.status(UNAUTHORIZED).json({
            error: getStatusText(UNAUTHORIZED),
        });
    }
};
exports.ensureAuthenticated = ensureAuthenticated;
