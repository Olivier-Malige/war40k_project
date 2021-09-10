// import express, { Application, Response, Request } from 'express';
import { ApolloServer } from 'apollo-server';
import { resolvers } from './graphQl/resolvers';
import { typeDefs } from './graphQl/schema';
import conf from './environment';
const env = conf[process.env.NODE_ENV as 'development' | 'production'];
import './database';

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: env.port }, () => {
  console.log(`🚀  Server ready at ${env.port}`);
});
