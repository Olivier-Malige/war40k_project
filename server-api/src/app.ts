import { ApolloServer } from 'apollo-server';
import { applyMiddleware } from 'graphql-middleware';
import { makeExecutableSchema } from 'graphql-tools';

import { resolvers } from './graphQl/resolvers';
import { typeDefs } from './graphQl/schema';
import conf from './environment';
const env = conf[process.env.NODE_ENV as 'development' | 'production'];
import './database';
import { verifyUserToken } from './firebase/auth';
import { permissions } from './graphQl/permissions';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    const user = await verifyUserToken(token);
    return { user };
  },
});

server.listen({ port: env.port }, () => {
  console.log(`🚀  Server ready at ${env.port}`);
});
