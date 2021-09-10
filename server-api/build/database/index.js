"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Units = void 0;
const mongoose_1 = require("mongoose");
const environment_1 = __importDefault(require("../environment"));
const unit_model_1 = require("./models/unit.model");
const env = environment_1.default[process.env.NODE_ENV];
(0, mongoose_1.connect)(env.dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});
mongoose_1.connection.on('error', () => {
    console.error('Error while connecting to DB');
});
const Units = (0, mongoose_1.model)('Units', unit_model_1.unitSchema);
exports.Units = Units;
