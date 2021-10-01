import { ApolloServer } from 'apollo-server';
import { applyMiddleware } from 'graphql-middleware';
import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';

import {
  typeDefs as Users,
  resolvers as usersResolvers,
  permission as usersPermission,
} from './graphQl/schemas/users';

import {
  typeDefs as W40kUnits,
  resolvers as w40kUnitsResolvers,
  permission as w40kUnitsPermission,
} from './graphQl/schemas/w40kUnits';

import conf from './environment';
const env = conf[process.env.NODE_ENV as 'development' | 'production'];
import './database';
import { verifyUserToken } from './firebase/users';

const schema = makeExecutableSchema({
  typeDefs: [Users, W40kUnits],
  resolvers: merge(usersResolvers, w40kUnitsResolvers),
});

const server = new ApolloServer({
  schema: applyMiddleware(schema, usersPermission, w40kUnitsPermission),
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    const user = await verifyUserToken(token);
    return { user };
  },
});

server.listen({ port: env.port }, () => {
  console.log(`🚀  Server ready at ${env.port}`);
});
