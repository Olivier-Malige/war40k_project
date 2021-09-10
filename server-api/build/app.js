"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express, { Application, Response, Request } from 'express';
const apollo_server_1 = require("apollo-server");
const resolvers_1 = require("./graphQl/resolvers");
const schema_1 = require("./graphQl/schema");
const environment_1 = __importDefault(require("./environment"));
const env = environment_1.default[process.env.NODE_ENV];
require("./database");
const server = new apollo_server_1.ApolloServer({ typeDefs: schema_1.typeDefs, resolvers: resolvers_1.resolvers });
server.listen({ port: env.port }, () => {
    console.log(`🚀  Server ready at ${env.port}`);
});
