"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
exports.default = {
    dbUrl: 'mongodb+srv://arknoid:artgore666@cluster0.ujqdv.mongodb.net/warhammer_api?retryWrites=true&w=majority',
    cert: path_1.default.join(__dirname, '../../ssl/local.crt'),
    key: path_1.default.join(__dirname, '../../ssl/local.key'),
    portHttp: 5000,
    portHttps: 5001,
    sessionSecret: '142ce4ad-3269-4592-9169-d39e87aabaa2'
};
