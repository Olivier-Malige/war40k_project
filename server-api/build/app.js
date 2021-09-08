"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const apollo_server_1 = require("apollo-server");
const books_1 = require("./GqlTypes/books");
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./routes"));
const errorhandler_1 = __importDefault(require("errorhandler"));
require("./database");
exports.app = (0, express_1.default)();
require("./config/session.config");
require("./config/passport.config");
const { INTERNAL_SERVER_ERROR, getStatusText } = http_status_codes_1.default;
exports.app.use((0, cors_1.default)());
exports.app.use((0, morgan_1.default)('short'));
exports.app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use(routes_1.default);
if (process.env.NODE_ENV === 'development') {
    exports.app.use((0, errorhandler_1.default)());
}
else {
    exports.app.use((err, _, res) => {
        const code = err.code || INTERNAL_SERVER_ERROR;
        res.status(code).json({
            code: code,
            message: code === INTERNAL_SERVER_ERROR ? getStatusText(INTERNAL_SERVER_ERROR) : err.message,
        });
    });
}
const server = new apollo_server_1.ApolloServer({ typeDefs: books_1.typeDefs, resolvers: books_1.resolvers });
server.listen({ port: 3001 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
// app.listen('3001', () => {
//   console.log('Server started on port 3001');
// });
